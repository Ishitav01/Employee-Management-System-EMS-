package com.ems.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ems.entity.AppUser;
import com.ems.entity.Employee;
import com.ems.service.EmsService;
import com.ems.service.UserService;

import lombok.Data;

@RestController
@RequestMapping("/api/ceo")
public class CeoController {

    @Autowired
    private UserService userService;
    @Autowired
    private EmsService emsService;

    // Assuming CEO has userId = 100
    private static final Long CEO_USERID = 100L;

    // CEO can create admin (or use AdminController with security constraint)
    @PostMapping("/create-admin")
    public ResponseEntity<?> createAdmin(@RequestBody AdminRequest req) {
        Boolean userExists = userService.existsByUsername(req.getUsername());

        if (userExists) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Username already exists");
        }

        AppUser newAdmin = userService.createAdmin(req.getName(), req.getUsername(), req.getPassword(), req.getEmail());

        Map<String, Object> resp = new HashMap<>();
        resp.put("id", newAdmin.getId());
        resp.put("name", newAdmin.getName());
        resp.put("username", newAdmin.getUsername());
        resp.put("email", newAdmin.getEmail());

        return ResponseEntity.status(HttpStatus.CREATED).body(resp);
    }

    @DeleteMapping("/remove-admin")
    public ResponseEntity<?> removeAdmin(@RequestParam String username) {

        try {
            AppUser user = userService.getByUsername(username);

            if (!("ROLE_ADMIN".equals(user.getRole()))) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User is not an ADMIN");
            }

            // Reassign employees created by the admin to CEO
            List<Employee> employees = emsService.findAllByCreatedBy(user.getId());
            for (Employee e : employees) {
                e.setCreatedBy(CEO_USERID);
                emsService.updateEmployee(e);
            }

            // DELETE the admin account.
            userService.deleteUser(username);
            return ResponseEntity.ok("Admin removed. All their employees reassigned to CEO.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with username " + username + " not found!");
        }
    }

    @PutMapping("/update-admin")
    public ResponseEntity<?> updateAdmin(@RequestBody AdminRequest req) {
        try {
            AppUser user = userService.getByUsername(req.getUsername());

            if (!("ROLE_ADMIN".equals(user.getRole()))) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("User is not an ADMIN");
            }

            userService.updateUser(req.getName(), req.getUsername(), req.getPassword(), req.getEmail());
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Admin details updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Unexpected Error occured: " + e.getMessage());
        }
    }

    @GetMapping("/all-users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.findAllUsers());
    }

    @GetMapping("/all-employees")
    public ResponseEntity<?> getAllEmployees() {
        return ResponseEntity.ok(emsService.getAllEmployees());
    }

    @GetMapping("/all-admins")
    public ResponseEntity<?> getAllAdmins() {
        List<AppUser> admins = userService.findAllAdmins();
        return ResponseEntity.ok(admins);
    }

    @Data
    public static class AdminRequest {
        private String name;
        private String username;
        private String password;
        private String email;

        // Getters and Setters created by Lombok @Data
    }

}

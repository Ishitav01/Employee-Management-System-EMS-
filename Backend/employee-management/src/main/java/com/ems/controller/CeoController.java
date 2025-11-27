package com.ems.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.entity.AppUser;
import com.ems.entity.Employee;
import com.ems.repository.EmsRepository;
import com.ems.repository.UserRepository;
import com.ems.service.UserService;

@RestController
@RequestMapping("/api/ceo")
public class CeoController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmsRepository emsRepository;

    // CEO can create admin (or use AdminController with security constraint)
    @PostMapping("/create-admin")
    @PreAuthorize("hasRole('CEO')")
    public ResponseEntity<?> createAdmin(@RequestBody AdminRequest req) {
        if (userRepository.findByUsername(req.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username exists");
        }

        AppUser admin = userService.createAdmin(req.getUsername(), req.getPassword(), req.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "id", admin.getId(), "username", admin.getUsername(), "email", admin.getEmail(), "role",
                admin.getRole()));
    }

    @DeleteMapping("/remove-admin/{username}")
    @PreAuthorize("hasRole('CEO')")
    public ResponseEntity<?> removeAdmin(@PathVariable String username) {

        Optional<AppUser> op = userRepository.findByUsername(username);
        if (op.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");

        AppUser u = op.get();
        if (!"ROLE_ADMIN".equals(u.getRole())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User is not an ADMIN");
        }

        // DELETE employees created by the admin
        List<Employee> employees = emsRepository.findAllByCreatedBy(username);
        for (Employee e : employees) {
            e.setCreatedBy("CEO"); // or auth.getName()
            emsRepository.save(e);
        }

        // DELETE the admin account
        userRepository.delete(u);

        return ResponseEntity.ok("Admin and their employees removed");
    }

    @GetMapping("/all-users")
    @PreAuthorize("hasRole('CEO')")
    public ResponseEntity<?> allUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/all-employees")
    @PreAuthorize("hasRole('CEO')")
    public ResponseEntity<?> allEmployees() {
        return ResponseEntity.ok(emsRepository.findAll());
    }

    public static class AdminRequest {
        private String username;
        private String password;
        private String email;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }

}

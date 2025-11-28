package com.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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

@RestController
@RequestMapping("/api/admin/employees")
public class AdminController {

    @Autowired
    private EmsService emsService;

    @Autowired
    private UserService userService;

    // Create employee — set createdBy to current admin's userId.
    @PostMapping
    public ResponseEntity<?> createEmployee(@RequestBody Employee emp, Authentication auth) {
        try {
            AppUser user = userService.getByUsername(auth.getName()); // logged-in admin username
            emp.setCreatedBy(user.getId());
            Employee saved = emsService.addEmployee(emp);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating employee: " + e.getMessage());
        }
    }

    // Admin can view only employees they created.
    @GetMapping
    public ResponseEntity<?> getMyEmployees(Authentication auth) {
        try {
            AppUser user = userService.getByUsername(auth.getName());

            List<Employee> allEmployees = emsService.findAllByCreatedBy(user.getId());
            if (allEmployees.isEmpty()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You have not created any employees");
            }
            return ResponseEntity.ok(allEmployees);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error fetching employees: " + e.getMessage());
        }
    }

    // Admin update only their created employees
    @PutMapping
    public ResponseEntity<?> updateEmployee(@RequestBody Employee update, Authentication auth) {
        try {
            AppUser user = userService.getByUsername(auth.getName());
            Employee employee = emsService.getEmployeeById(update.getId());

            if (user.getId() != employee.getCreatedBy()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only update employees you created");
            }

            emsService.updateEmployee(update);
            return ResponseEntity.ok(update);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error updating employee: " + e.getMessage());
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteEmployee(@RequestParam Long id, Authentication auth) {
        try {
            AppUser user = userService.getByUsername(auth.getName());

            Employee employee = emsService.getEmployeeById(id);

            if (user.getId() != employee.getCreatedBy()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only delete employees you created");
            }
            emsService.deleteEmployee(id);
            return ResponseEntity.ok("Employee, " + employee.getName() + " deleted");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error deleting employee: " + e.getMessage());
        }
    }
}

package com.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.entity.Employee;
import com.ems.exceptions.EmployeeNotFoundException;
import com.ems.repository.EmsRepository;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private EmsRepository emsRepository;

    // Create employee — set createdBy to current admin's username
    @PostMapping("/employees")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createEmployee(@RequestBody Employee emp, Authentication auth) {
        String username = auth.getName(); // logged-in admin username
        emp.setCreatedBy(username);
        Employee saved = emsRepository.save(emp);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // Admin can view only employees they created
    @GetMapping("/employees")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Employee>> getMyEmployees(Authentication auth) {
        String username = auth.getName();
        return ResponseEntity.ok(emsRepository.findAllByCreatedBy(username));
    }

    // Admin update only their created employees
    @PutMapping("/employees/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody Employee update, Authentication auth) {
        String username = auth.getName();
        Employee e = emsRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException("Employee not found"));
        if (!username.equals(e.getCreatedBy())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only update employees you created");
        }
        e.setName(update.getName());
        e.setDesignation(update.getDesignation());
        e.setSalary(update.getSalary());
        e.setEmail(update.getEmail());
        emsRepository.save(e);
        return ResponseEntity.ok(e);
    }

    @DeleteMapping("/employees/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id, Authentication auth) {
        String username = auth.getName();
        Employee e = emsRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException("Employee not found"));
        if (!username.equals(e.getCreatedBy())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only delete employees you created");
        }
        emsRepository.delete(e);
        return ResponseEntity.ok("Employee deleted");
    }
}

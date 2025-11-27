package com.ems.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import com.ems.entity.AppUser;
import com.ems.entity.Employee;
import com.ems.repository.EmsRepository;
import com.ems.repository.UserRepository;
import com.ems.exceptions.EmployeeNotFoundException;

@RestController
@RequestMapping("/api/employees")
public class EmployeeControllerPublic {

    @Autowired
    private EmsRepository emsRepository;
    @Autowired
    private UserRepository userRepository;

    // User (ROLE_USER) can view only their employee details if an employee row
    // exists with same email
    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> myEmployeeDetails(Authentication auth) {
        String username = auth.getName();
        AppUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Optional<Employee> op = emsRepository.findByEmail(user.getEmail());

        if (op.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No employee record for this user");
        return ResponseEntity.ok(op.get());
    }

    // you can also expose /api/employees/{id} protected: only CEO or admin(owner)
    // can view
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('CEO','ADMIN')")
    public ResponseEntity<?> getById(@PathVariable Long id, Authentication auth) {
        Employee e = emsRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException("Employee not found"));
        // if ADMIN, ensure it's their employee
        if (auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            if (!auth.getName().equals(e.getCreatedBy()))
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Admins can only view their own employees");
        }
        return ResponseEntity.ok(e);
    }
}

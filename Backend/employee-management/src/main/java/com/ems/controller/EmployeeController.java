package com.ems.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import com.ems.entity.Employee;
import com.ems.repository.EmsRepository;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmsRepository employeeRepository;

    /*  
     * =======================
     *    VIEW ONLY (USER + ADMIN + CEO)
     * =======================
     */

    @GetMapping("/view/all")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok(employeeRepository.findAll());
    }

    @GetMapping("/view/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable Long id) {
        Optional<Employee> op = employeeRepository.findById(id);
        if (op.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");

        return ResponseEntity.ok(op.get());
    }

    /*  
     * =======================
     *    CRUD (ADMIN + CEO ONLY)
     * =======================
     */

    @PostMapping("/add")
    public ResponseEntity<?> createEmployee(@RequestBody Employee emp, Authentication authentication) {
        if (!hasRole(authentication, "ROLE_ADMIN") && !hasRole(authentication, "ROLE_CEO")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Only ADMIN or CEO can add employees");
        }

        Employee saved = employeeRepository.save(emp);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id,
                                            @RequestBody Employee update,
                                            Authentication authentication) {

        if (!hasRole(authentication, "ROLE_ADMIN") && !hasRole(authentication, "ROLE_CEO")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Only ADMIN or CEO can update employees");
        }

        Optional<Employee> op = employeeRepository.findById(id);
        if (op.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");

        Employee emp = op.get();
        emp.setName(update.getName());
        emp.setEmail(update.getEmail());
        emp.setDesignation(update.getDesignation());
        emp.setSalary(update.getSalary());

        employeeRepository.save(emp);
        return ResponseEntity.ok(emp);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id,
                                            Authentication authentication) {

        if (!hasRole(authentication, "ROLE_ADMIN") && !hasRole(authentication, "ROLE_CEO")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Only ADMIN or CEO can delete employees");
        }

        if (!employeeRepository.existsById(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");

        employeeRepository.deleteById(id);
        return ResponseEntity.ok("Employee deleted");
    }

    /*
     * =======================
     *    ROLE CHECKER
     * =======================
     */
    private boolean hasRole(Authentication auth, String role) {
        if (auth == null)
            return false;

        for (GrantedAuthority ga : auth.getAuthorities()) {
            if (ga.getAuthority().equals(role))
                return true;
        }
        return false;
    }
}

package com.ems.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.entity.AppUser;
import com.ems.entity.Employee;
import com.ems.service.EmsService;
import com.ems.service.UserService;
import com.ems.utility.JwtUtil;

import lombok.Data;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserService userService;
    @Autowired
    private EmsService emsService;

    @PostMapping("/create-ceo")
    public ResponseEntity<?> createCEO() {
        Map<String, String> resp = new HashMap<>();
        resp.put("username", "ceo_user");
        resp.put("password", "ceo123");

        // Ensures only one CEO can be created in db
        if (userService.existsByUsername("ceo_user")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("CEO user already exists. " + resp.toString());
        }

        userService.createCEO();
        emsService.createCEO();

        return ResponseEntity.status(HttpStatus.CREATED).body(resp);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

            AppUser user = userService.getByUsername(request.getUsername());
            Employee emp = emsService.getEmployeeByUserId(user.getId()); // Employee table fetch
            String accessToken = jwtUtil.generateAccessToken(user.getUsername());
            String refreshToken = jwtUtil.generateRefreshToken(user.getUsername());

            Map<String, Object> resp = new HashMap<>();

            // User details
            resp.put("id", user.getId());
            resp.put("username", user.getUsername());
            resp.put("email", user.getEmail());
            resp.put("role", user.getRole());

            // additional employee information
            if (emp != null) {
                resp.put("name", emp.getName());
                resp.put("designation", emp.getDesignation());
                resp.put("salary", emp.getSalary());
            } else {
                resp.put("name", user.getName()); // CEO or Admin (no employee record)
                resp.put("designation", "N/A");
                resp.put("salary", "N/A");
            }

            // Returning tokens
            resp.put("accessToken", accessToken);
            resp.put("refreshToken", refreshToken);

            return ResponseEntity.ok(resp);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Something went wrong : " + ex.getMessage());
        }
    }

    // Register -> create a USER and return same shape with tokens.
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        try {

            ResponseEntity<?> canBeRegisteredResponse = canBeRegistered(req);
            if (canBeRegisteredResponse != null) {
                return canBeRegisteredResponse;
            }

            // Create user and save in app_user table
            AppUser user = userService.createUser(req.getName(), req.getUsername(), req.getPassword(),
                    req.getEmail(), req.getRole());

            // Create employee and save in employee table
            Employee employee = emsService.createEmployee(
                    req.getName(), req.getEmail(), req.getDesignation(), req.getSalary(), user.getId());

            String accessToken = jwtUtil.generateAccessToken(user.getUsername());
            String refreshToken = jwtUtil.generateRefreshToken(user.getUsername());

            Map<String, Object> resp = new HashMap<>();

            // User details
            resp.put("id", user.getId());
            resp.put("username", user.getUsername());
            resp.put("email", user.getEmail());
            resp.put("role", user.getRole());

            // Employee details
            resp.put("employee", employee);

            // Returning tokens
            resp.put("accessToken", accessToken);
            resp.put("refreshToken", refreshToken);

            return ResponseEntity.status(HttpStatus.CREATED).body(resp);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Something went wrong : " + ex.getMessage());
        }
    }

    public ResponseEntity<?> canBeRegistered(RegisterRequest req) {
        if (userService.existsByUsername(req.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Username, " + req.getUsername() + " already exists");
        } else if (userService.existsByEmail(req.getEmail()) || emsService.existsByEmail(req.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Email, " + req.getEmail() + " already exists");
        } else if (req.getRole().equals("ROLE_CEO") || req.getRole().equals("CEO")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Cannot register as CEO");
        }

        return null;
    }

    // DTOs
    @Data
    public static class AuthRequest {
        private String username;
        private String password;
    }

    @Data
    public static class RegisterRequest {
        private String name;
        private String username;
        private String password;
        private String email;
        private String role;

        private double salary;
        private String designation;
    }
}

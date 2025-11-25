package com.ems.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ems.utility.JwtUtil;

@RestController
@RequestMapping
public class AdminController {

    @GetMapping("/login/admin")
    public ResponseEntity<?> loginAdmin(@RequestParam String username) {
        String token = JwtUtil.generateToken(username, List.of("ROLE_ADMIN"));
        System.out.println("ADMIN TOKEN:" + token);
        return ResponseEntity.ok("Bearer " + token);
    }

    @GetMapping("/login/user")
    public ResponseEntity<?> loginUser(@RequestParam String username) {
        String token = JwtUtil.generateToken(username, List.of("ROLE_USER"));
        System.out.println("USER TOKEN:" + token);
        return ResponseEntity.ok("Bearer " + token);
    }

    @GetMapping("/hello")
    public String hello(Authentication auth) {
        return "Hello, " + auth.getName() + "! You are authenticated.";
    }

    @GetMapping("/admin")
    public String admin(Authentication auth) {
        return "Welcome Admin, " + auth.getName() + "! You have special access.";
    }
}

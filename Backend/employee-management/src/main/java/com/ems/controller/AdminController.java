package com.ems.controller;

import com.ems.entity.AppUser;
import com.ems.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Create ADMIN (CEO only access enforced by SecurityConfig antMatcher)
    @PostMapping("/create")
    public ResponseEntity<?> createAdmin(@RequestBody AdminRequest req) {
        if (userRepository.findByUsername(req.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username exists");
        }
        AppUser admin = new AppUser();
        admin.setUsername(req.getUsername());
        admin.setPassword(passwordEncoder.encode(req.getPassword()));
        admin.setRoles(new HashSet<>(Collections.singletonList("ROLE_ADMIN")));
        userRepository.save(admin);
        return ResponseEntity.status(HttpStatus.CREATED).body("Admin created");
    }

    // Remove ADMIN by username (CEO only)
    @DeleteMapping("/remove/{username}")
    public ResponseEntity<?> removeAdmin(@PathVariable String username) {
        Optional<AppUser> op = userRepository.findByUsername(username);
        if (op.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        AppUser user = op.get();
        if (!user.getRoles().contains("ROLE_ADMIN")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User is not an ADMIN");
        }
        userRepository.delete(user);
        return ResponseEntity.ok("Admin removed");
    }

    // DTO
    public static class AdminRequest {
        private String username;
        private String password;
        public String getUsername(){return username;}
        public void setUsername(String u){this.username=u;}
        public String getPassword(){return password;}
        public void setPassword(String p){this.password=p;}
    }
}

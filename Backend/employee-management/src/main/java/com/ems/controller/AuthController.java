package com.ems.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.ems.repository.UserRepository;
import com.ems.service.UserService;
import com.ems.utility.JwtUtil;

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
    private UserRepository userRepository;

    // LOGIN → Return Access + Refresh Tokens
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid credentials");
        }

        UserDetails userDetails = userService.loadUserByUsername(request.getUsername());

        String accessToken = jwtUtil.generateAccessToken(userDetails.getUsername());
        String refreshToken = jwtUtil.generateRefreshToken(userDetails.getUsername());

        Map<String, String> resp = new HashMap<>();
        resp.put("accessToken", accessToken);
        resp.put("refreshToken", refreshToken);

        return ResponseEntity.ok(resp);
    }

    // REGISTER → Creates a normal USER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {

        if (userRepository.findByUsername(req.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Username already exists");
        }

        userService.createUser(req.getUsername(), req.getPassword());

        return ResponseEntity.ok("User Registered Successfully");
    }

    // REFRESH TOKEN → Returns new Access Token only
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> req) {

        String refreshToken = req.get("refreshToken");

        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Refresh token is missing");
        }

        if (!jwtUtil.validateToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid or expired refresh token");
        }

        String username = jwtUtil.extractUsername(refreshToken);
        String newAccessToken = jwtUtil.generateAccessToken(username);

        Map<String, String> resp = new HashMap<>();
        resp.put("accessToken", newAccessToken);

        return ResponseEntity.ok(resp);
    }


    // DTOs
    public static class AuthRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String u) { this.username = u; }

        public String getPassword() { return password; }
        public void setPassword(String p) { this.password = p; }
    }

    public static class RegisterRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String u) { this.username = u; }

        public String getPassword() { return password; }
        public void setPassword(String p) { this.password = p; }
    }
}

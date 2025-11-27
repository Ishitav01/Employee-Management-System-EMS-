package com.ems.service;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ems.entity.AppUser;
import com.ems.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // ensure role starts with ROLE_
        String role = user.getRole();
        if (!role.startsWith("ROLE_")) role = "ROLE_" + role;

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(role))
        );
    }

    public AppUser getByUsername(String username) {
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public AppUser createUser(String username, String rawPassword, String email) {
        AppUser user = new AppUser();
        user.setUsername(username);
        user.setPassword(encoder.encode(rawPassword));
        user.setEmail(email);
        user.setRole("ROLE_USER"); // default
        return userRepo.save(user);
    }

    // create admin (CEO will call controller to create admin)
    public AppUser createAdmin(String username, String rawPassword, String email) {
        AppUser user = new AppUser();
        user.setUsername(username);
        user.setPassword(encoder.encode(rawPassword));
        user.setEmail(email);
        user.setRole("ROLE_ADMIN");
        return userRepo.save(user);
    }

    public void promoteToAdmin(String username) {
        AppUser user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole("ROLE_ADMIN");
        userRepo.save(user);
    }

    public void demoteToUser(String username) {
        AppUser user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole("ROLE_USER");
        userRepo.save(user);
    }

    // other helper methods like findAllUsers() for CEO view...
    public List<AppUser> findAll() { return userRepo.findAll(); }
}

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

        // Normalize stored roles: if they don't start with ROLE_ add it when creating
        // authorities
        List<SimpleGrantedAuthority> authorities = user.getRoles().stream()
                .map(r -> {
                    String role = r.startsWith("ROLE_") ? r : "ROLE_" + r;
                    return new SimpleGrantedAuthority(role);
                })
                .collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                authorities);
    }

    public AppUser getByUsername(String username) {
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    // create normal user (role = USER)
    public AppUser createUser(String username, String rawPassword) {
        AppUser user = new AppUser();
        user.setUsername(username);
        user.setPassword(encoder.encode(rawPassword));
        user.setRoles(Collections.singleton("USER")); // store as "USER" (not ROLE_USER)
        return userRepo.save(user);
    }

    // promote to admin (CEO only should call this via controller)
    public void promoteToAdmin(String username) {
        AppUser user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Set<String> roles = new HashSet<>(user.getRoles());
        roles.add("ADMIN"); // store raw role
        user.setRoles(roles);
        userRepo.save(user);
    }

    // demote admin -> remove ADMIN role
    public void demoteAdmin(String username) {
        AppUser user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Set<String> roles = new HashSet<>(user.getRoles());
        roles.remove("ADMIN");
        user.setRoles(roles);
        userRepo.save(user);
    }
}

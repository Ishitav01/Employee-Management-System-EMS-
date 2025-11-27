package com.ems.service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ems.entity.AppUser;
import com.ems.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

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

    @Override
    public AppUser getByUsername(String username) {
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public Boolean existsByUsername(String username) {
        return userRepo.findByUsername(username).isPresent();
    } 

    @Override
    public AppUser createUser(String name, String username, String rawPassword, String email, String role) {
        AppUser user = new AppUser();
        user.setName(name);
        user.setUsername(username);
        user.setPassword(encoder.encode(rawPassword));
        user.setEmail(email);
        user.setRole(role); // default
        return userRepo.save(user);
    }

    @Override
    public void updateUser(AppUser newUser) {
        AppUser existingUser = userRepo.findByUsername(newUser.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User with " + newUser.getUsername() + " not found"));

        existingUser.setName(newUser.getName());
        existingUser.setEmail(newUser.getEmail());
        existingUser.setPassword(newUser.getPassword());
        existingUser.setRole(newUser.getRole());
        existingUser.setUsername(newUser.getUsername());

        userRepo.save(existingUser);
    }

    @Override
    public void deleteUser(String username) {
        AppUser user = userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        userRepo.delete(user);   
    }

    // create admin (CEO will call controller to create admin)
    @Override
    public AppUser createAdmin(String username, String rawPassword, String email) {
        AppUser user = new AppUser();
        user.setUsername(username);
        user.setPassword(encoder.encode(rawPassword));
        user.setEmail(email);
        user.setRole("ROLE_ADMIN");

        return userRepo.save(user);
    }

    @Override
    public void promoteToAdmin(String username) {
        AppUser user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole("ROLE_ADMIN");
        userRepo.save(user);
    }

    @Override
    public void demoteToUser(String username) {
        AppUser user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole("ROLE_USER");
        userRepo.save(user);
    }

    // other helper methods like findAllUsers() for CEO view
    @Override
    public List<AppUser> findAllUsers() { 
        return userRepo.findAll(); 
    }
}

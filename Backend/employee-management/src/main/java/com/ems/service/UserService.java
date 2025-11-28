package com.ems.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.ems.entity.AppUser;

public interface UserService extends UserDetailsService {
    public AppUser getByUsername(String username);
    public Boolean existsByUsername(String username);
    public Boolean existsByEmail(String email);
    public AppUser createUser(String name, String username, String rawPassword, String email, String role);
    public void updateUser(AppUser user);
    public void deleteUser(String username);
    public AppUser createAdmin(String username, String rawPassword, String email);
    public void promoteToAdmin(String username);
    void demoteToUser(String username);
    public List<AppUser> findAllUsers();
}

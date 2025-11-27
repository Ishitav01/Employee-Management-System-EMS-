package com.ems.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "app_user")
public class AppUser {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

<<<<<<< HEAD
    @Column(nullable = false)
    private String password; // encoded
=======
    private String email;
    private String password; // stored encoded
>>>>>>> 93a7d231a35db1d86901efc4c95b85c1d505d42a

    @Column(unique = true, nullable = false)
    private String email;

    // single role: e.g. "ROLE_CEO", "ROLE_ADMIN", "ROLE_USER"
    @Column(nullable = false)
    private String role;

    public AppUser() {}

<<<<<<< HEAD
    public AppUser(String username, String password, String email, String role) {
=======
    public AppUser(String username,String email, String password, Set<String> roles) {
>>>>>>> 93a7d231a35db1d86901efc4c95b85c1d505d42a
        this.username = username;
        this.email=email;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    // getters & setters...
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

<<<<<<< HEAD
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
=======
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    public void setEmail(String email){
        this.email=email;
    }
    public String getEmail(){
        return email;
    }
}
>>>>>>> 93a7d231a35db1d86901efc4c95b85c1d505d42a

package com.ems.controller;

import com.ems.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ceo")
public class CeoController {

    @Autowired
    private UserService userService;

    @PostMapping("/promote/{username}")
    public String promoteToAdmin(@PathVariable String username) {
        userService.promoteToAdmin(username);
        return "User promoted to ADMIN: " + username;
    }

    @PostMapping("/demote/{username}")
    public String demoteAdmin(@PathVariable String username) {
        userService.demoteAdmin(username);
        return "Admin demoted to USER: " + username;
    }
}

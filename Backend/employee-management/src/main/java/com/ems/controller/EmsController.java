package com.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ems.entity.Employee;
import com.ems.service.EmsService;


@RestController
@RequestMapping("/api") 
public class EmsController {
    @Autowired
    private EmsService emsService;

    @GetMapping("/employees/")
    public List<Employee> getAllEmployees() {
        return emsService.getAllEmployees();
    }

    @PostMapping("/employees/")
    public void addEmployee(@RequestParam Employee employee) {
        emsService.addEmployee(employee);
    }

    @PutMapping("/employees/")
    public void updateEmployee(@RequestParam Employee employee) {
        emsService.updateEmployee(employee);
    }

    @DeleteMapping("/employees/")
    public void deleteEmployee(@RequestParam int id) {
        emsService.deleteEmployee(id);
    }
}

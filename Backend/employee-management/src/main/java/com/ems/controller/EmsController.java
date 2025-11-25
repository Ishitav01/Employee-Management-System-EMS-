package com.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ems.entity.Employee;
import com.ems.service.EmsService;


@RestController
@RequestMapping("/api/employees") 
public class EmsController {
    @Autowired
    private EmsService emsService;

    @GetMapping
    public List<Employee> getAllEmployees() {
        return emsService.getAllEmployees();
    }

    @PostMapping
    public void addEmployee(@RequestBody Employee employee) {
        emsService.addEmployee(employee);
    }

    @PutMapping
    public void updateEmployee(@RequestBody Employee employee) {
        emsService.updateEmployee(employee);
    }

    @DeleteMapping
    public void deleteEmployee(@RequestParam int id) {
        emsService.deleteEmployee(id);
    }
}

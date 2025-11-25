package com.ems.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ems.entity.Employee;

@Service
public interface EmsService {
    public void addEmployee();
    public List<Employee> getAllEmployees();
    public Employee getEmployeeById(int id);
    public void updateEmployee(Employee employee);
    public void deleteEmployee(int id);
}

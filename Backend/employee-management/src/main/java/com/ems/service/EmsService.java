package com.ems.service;

import java.util.List;

import com.ems.entity.Employee;

public interface EmsService {
    public Employee addEmployee(Employee employee);
    public List<Employee> getAllEmployees();
    public List<Employee> findAllByCreatedBy(Long userId);
    public Boolean existsByEmail(String email);
    public Employee getEmployeeById(Long id);
    public void updateEmployee(Employee employee);
    public void updateEmployee(String name, String email, String designation, double salary, Long createdBy);
    public void deleteEmployee(Long id);
    public Employee createEmployee(String name, String email, String designation, double salary, Long id);
    public void createCEO();
}

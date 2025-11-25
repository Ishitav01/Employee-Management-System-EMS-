package com.ems.service;

import java.util.List;

import com.ems.entity.Employee;

public interface EmsService {
    public void addEmployee(Employee employee);
    public List<Employee> getAllEmployees();
    public Employee getEmployeeById(int id);
    public void updateEmployee(Employee employee);
    public void deleteEmployee(int id);
}

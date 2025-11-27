package com.ems.service;

import java.util.List;
import com.ems.entity.Employee;

public interface EmsService {
    void addEmployee(Employee employee);
    List<Employee> getAllEmployees();
    Employee getEmployeeById(Long id);
    void updateEmployee(Employee employee);
    void deleteEmployee(Long id);
}

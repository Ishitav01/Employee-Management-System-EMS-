package com.ems.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.ems.entity.Employee;
import com.ems.exceptions.EmployeeNotFoundException;
import com.ems.repository.EmsRepository;


public class EmsServiceImpl implements EmsService {

    @Autowired
    private EmsRepository emsRepository;

    @Override
    public void addEmployee(Employee employee) {
        Optional.ofNullable(employee).map(e -> e)
        .orElseThrow(() -> new EmployeeNotFoundException("Employee object is null"));

        emsRepository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return emsRepository.findAll();
    }

    @Override
    public Employee getEmployeeById(int id) {
        return emsRepository.findById(id)
        .orElseThrow(() -> new EmployeeNotFoundException("Employee with id " + id + " not found"));
    }

    @Override
    public void updateEmployee(Employee employee) {
        Employee existingEmployee = emsRepository.findById(employee.getId())
        .orElseThrow(() -> new EmployeeNotFoundException("Employee with id " + employee.getId() + " not found"));

        existingEmployee.setName(employee.getName());
        existingEmployee.setDesignation(employee.getDesignation());
        existingEmployee.setEmail(employee.getEmail());
        existingEmployee.setSalary(employee.getSalary());

        emsRepository.save(existingEmployee);
    }

    @Override
    public void deleteEmployee(int id) {
        Employee existingEmployee = emsRepository.findById(id)
        .orElseThrow(() -> new EmployeeNotFoundException("Employee with id " + id + " not found"));

        emsRepository.delete(existingEmployee);
    }
}

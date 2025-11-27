package com.ems.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.entity.Employee;
import com.ems.exceptions.EmployeeNotFoundException;
import com.ems.exceptions.UserNotFoundException;
import com.ems.repository.EmsRepository;
import com.ems.repository.UserRepository;

@Service
public class EmsServiceImpl implements EmsService {

    @Autowired
    private EmsRepository emsRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Employee addEmployee(Employee employee) {
        Optional.ofNullable(employee).map(emp -> emp)
            .orElseThrow(() -> new EmployeeNotFoundException("Employee object is null"));
        
            emsRepository.save(employee);
        return employee;
    }

    @Override
    public List<Employee> getAllEmployees() {
        return emsRepository.findAll();
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return emsRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee with ID " + id + " not found"));
    }

    @Override
    public void updateEmployee(Employee employee) {
        Employee existingEmployee = emsRepository.findById(employee.getId())
                .orElseThrow(() -> new EmployeeNotFoundException("Employee with ID " + employee.getId() + " not found"));

        existingEmployee.setName(employee.getName());
        existingEmployee.setDesignation(employee.getDesignation());
        existingEmployee.setEmail(employee.getEmail());
        existingEmployee.setSalary(employee.getSalary());

        emsRepository.save(existingEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee existingEmployee = emsRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee with ID " + id + " not found"));

        emsRepository.delete(existingEmployee);
    }

    @Override
    public List<Employee> findAllByCreatedBy(Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with " + userId + " not found"));
        
        return emsRepository.findAllByCreatedBy(userId);
    }
}

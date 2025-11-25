package com.ems.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.ems.entity.Employee;
import com.ems.repository.EmsRepository;


public class EmsServiceImpl implements EmsService {

    @Autowired
    private EmsRepository emsRepository;

    @Override
    public void addEmployee() {
        
    }

    @Override
    public List<Employee> getAllEmployees() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllEmployees'");
    }

    @Override
    public Employee getEmployeeById(int id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getEmployeeById'");
    }

    @Override
    public void updateEmployee(Employee employee) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateEmployee'");
    }

    @Override
    public void deleteEmployee(int id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteEmployee'");
    }
}

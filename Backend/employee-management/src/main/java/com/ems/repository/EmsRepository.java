package com.ems.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ems.entity.Employee;

@Repository
public interface EmsRepository extends JpaRepository<Employee, Long> {
    public Optional<Employee> findByEmail(String email);
    public List<Employee> findAllByCreatedBy(Long userId);
}


package com.ems.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data @Entity
public class Employee {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    @NotNull
    String name;
    @NotNull
    String email;
    @NotNull
    String designation;
    double salary;
}

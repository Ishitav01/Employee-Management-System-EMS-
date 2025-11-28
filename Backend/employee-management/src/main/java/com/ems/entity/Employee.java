package com.ems.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity @Table(name = "employee")
@Data
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String designation;

    @Min(value = 0, message = "Salary must be positive")
    private Double salary;

    @Column(unique = true)
    private String email;

    //Id of the user from app_user who created this employee
    private Long createdBy; 


    //Getters and Setters are created by Lombok @Data
   
}

package com.ems.exceptions;

public class EmployeeNotFound extends RuntimeException {
    String message;

    public EmployeeNotFound(String message) {
        this.message = message;
    }

    public EmployeeNotFound() {
        this.message = "Employee Not Found";
    }

    @Override
	public String toString() {
		return message;
	}
}

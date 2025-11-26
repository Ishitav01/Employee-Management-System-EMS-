package com.ems.exceptions;

public class EmployeeNotFoundException extends RuntimeException {
    String message;

    public EmployeeNotFoundException(String message) {
        this.message = message;
    }

    public EmployeeNotFoundException() {
        this.message = "Employee Not Found";
    }

    @Override
	public String toString() {
		return message;
	}
}

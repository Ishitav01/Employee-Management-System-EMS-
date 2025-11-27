package com.ems.exceptions;

public class UserNotFoundException extends RuntimeException {
    String message;

    public UserNotFoundException(String message) {
        this.message = message;
    }

    public UserNotFoundException() {
        //default message in case no message is provided
        this.message = "User Not Found";
    }

    @Override
	public String toString() {
		return message;
	}
}

package com.koishop.exception;

public class DuplicateEntity extends RuntimeException {

    public DuplicateEntity(String message) {
        super(message);
    }
}

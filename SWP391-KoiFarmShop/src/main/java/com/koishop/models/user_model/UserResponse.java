package com.koishop.models.user_model;

import lombok.Data;

@Data
public class UserResponse {
    private long userId;
    private String token;
}

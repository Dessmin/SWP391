package com.koishop.models.user_model;

import lombok.Data;

@Data
public class UserResponse {
    private long userId;
    private String username;
    private String email;
    private String phone;
    private String token;
}

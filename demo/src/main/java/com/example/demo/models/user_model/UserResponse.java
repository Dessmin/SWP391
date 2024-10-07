package com.example.demo.models.user_model;

import lombok.Data;

@Data
public class UserResponse {
    String username;
    String email;
    String phone;
    String token;
}

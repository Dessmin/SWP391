package com.koishop.models.user_model;

import lombok.Data;

@Data
public class LoginRequest {
    String username;
    String password;
}

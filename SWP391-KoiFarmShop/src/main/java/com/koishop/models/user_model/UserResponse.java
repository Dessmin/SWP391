package com.koishop.models.user_model;

import com.koishop.entity.Role;
import lombok.Data;

@Data
public class UserResponse {
    private long userId;
    private Role role;
    private String token;
}

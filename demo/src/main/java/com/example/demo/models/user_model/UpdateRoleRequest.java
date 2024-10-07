package com.example.demo.models.user_model;

import com.example.demo.entity.Role;
import lombok.Data;

@Data
public class UpdateRoleRequest {
    private Role role;
}

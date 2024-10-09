package com.koishop.models.user_model;

import com.koishop.entity.Role;
import lombok.Data;

@Data
public class UpdateRoleRequest {
    private Role role;
}

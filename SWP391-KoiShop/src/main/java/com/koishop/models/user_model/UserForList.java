package com.koishop.models.user_model;

import com.koishop.entity.Role;
import lombok.Data;

import java.util.Date;

@Data
public class UserForList {
    private String userName;
    private Date joinDate;
    private Role role;
}

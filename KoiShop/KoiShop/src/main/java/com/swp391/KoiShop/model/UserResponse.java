package com.swp391.KoiShop.model;

import lombok.Data;

@Data
public class UserResponse {
    String username;
    String email;
    String phone;
    String token;
}

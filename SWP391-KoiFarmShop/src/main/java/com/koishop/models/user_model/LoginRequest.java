package com.koishop.models.user_model;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank(message = "UserName không được để trống")
    @Size(min = 3, max = 50, message = "UserName phải có từ 3 đến 50 ký tự")
    @Column(unique = true)
    private String username;

    @NotBlank(message = "Password không được để trống")
    @Size(min = 8, message = "Password phải có ít nhất 8 ký tự")
    private String password;
}

package com.example.demo.models.user_model;

import com.example.demo.entity.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.validator.constraints.Email;

import java.util.Date;

@Data
public class AdminViewUser {

    @NotBlank(message = "UserName không được để trống")
    @Size(min = 3, max = 50, message = "UserName phải có từ 3 đến 50 ký tự")
    @Column(unique = true)
    private String userName;

    @NotBlank(message = "Password không được để trống")
    @Size(min = 8, message = "Password phải có ít nhất 8 ký tự")
    private String password;

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "PhoneNumber không được để trống")
    @Pattern(regexp = "(^0(3|5|7|8|9)[0-9]{8,9}$)", message = "Số điện thoại không hợp lệ")
    private String phoneNumber;

    @NotBlank(message = "Address không được để trống")
    @Size(min = 5, max = 100, message = "Address phải có từ 5 đến 100 ký tự")
    private String address;

    @PositiveOrZero(message = "PointsBalance không thể âm")
    private Double pointsBalance;

    @Temporal(TemporalType.DATE)
    private Date joinDate;

    @Enumerated(EnumType.STRING)
    private Role role;
}

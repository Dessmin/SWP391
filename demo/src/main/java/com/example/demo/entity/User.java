package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Email;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private long userId;

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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        if (this.role != null) authorities.add(new SimpleGrantedAuthority(this.role.toString()));
        return authorities;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Orders> orders;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<ConsignmentRequest> consignmentRequests;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<RatingsFeedbacks> ratingsFeedbacks;
}

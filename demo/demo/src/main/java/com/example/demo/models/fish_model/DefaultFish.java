package com.example.demo.models.fish_model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class DefaultFish {
    @NotBlank(message = "KoiFishName không được để trống")
    @Size(min = 3, max = 50, message = "UserName phải có từ 3 đến 50 ký tự")
    @Column(unique = true)
    private String fishName;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Gender is required")
    private Boolean gender;

    @NotNull(message = "Birth date is required")
    @Temporal(TemporalType.DATE)
    private Date birthDate;

    @NotBlank(message = "Diet is required")
    private String diet;

    @NotNull(message = "Size is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Size must be greater than zero")
    private Double size;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than zero")
    private BigDecimal price;

    @NotBlank(message = "Food is required")
    private String food;

    @NotBlank(message = "Screening rate is required")
    private String screeningRate;

    @NotBlank(message = "Image is required")
    private String image;
}

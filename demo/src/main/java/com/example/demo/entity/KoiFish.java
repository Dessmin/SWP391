package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Data
@Entity
public class KoiFish {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Integer koiID;

    @NotNull(message = "Certificate ID is required")
    private Integer certificateID;

    @NotNull(message = "Breed ID is required")
    private Integer breedID;

    private Integer promotionID;

    @NotBlank(message = "Origin is required")
    private String originN;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Gender is required")
    private Boolean gender;

    @NotNull(message = "UserID is required")
    private Integer userID;

    @NotNull(message = "Age is required")
    @Min(value = 0, message = "Age cannot be negative")
    private Integer age;

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

    @NotNull(message = "Is for sale is required")
    private Boolean isForSale;

    @NotBlank(message = "Screening rate is required")
    private String screeningRate;

    @NotBlank(message = "Image is required")
    private String image;
}

package com.example.demo.models.fish_model;

import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class ViewFish {
    private String fishName;
    private String description;
    private String breed;
    private String origin;
    private Boolean gender;
    private Date birthDate;
    private String diet;
    private Double size;
    private BigDecimal price;
    private String food;
    private String screeningRate;
    private String image;
}

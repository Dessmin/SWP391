package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class KoiFish {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Integer koiID;

    @NotBlank(message = "KoiFishName không được để trống")
    @Size(min = 3, max = 50, message = "UserName phải có từ 3 đến 50 ký tự")
    @Column(unique = true)
    private String fishName;

    @OneToMany(mappedBy = "koiFish")
    @JsonIgnore
    private List<Certificate> certificates ;

    @NotNull(message = "Breed ID is required")
    @ManyToOne
    @JoinColumn(name = "breed_id")
    private Breeds breed;

    @NotNull(message = "Origin ID is required")
    @ManyToOne
    @JoinColumn(name = "origin_id")
    private Origin origin;

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

    @NotNull(message = "Is for sale is required")
    private Boolean isForSale;

    @NotBlank(message = "Screening rate is required")
    private String screeningRate;

    @NotBlank(message = "Image is required")
    private String image;

    @JsonIgnore
    @OneToOne(mappedBy = "koiFish")
    private ConsignmentRequest consignmentRequest;

    @JsonIgnore
    @OneToOne(mappedBy = "koiFish")
    private OrderDetails orderDetails;

    @OneToMany(mappedBy = "koiFish")
    @JsonIgnore
    private List<RatingsFeedbacks> ratingsFeedbacks;
}

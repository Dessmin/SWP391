package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class ConsignmentRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Integer consignmentID;

    @NotNull(message = "User ID is required")
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull(message = "Koi ID is required")
    @OneToOne
    @JoinColumn(name = "koifish_id")
    private KoiFish koiFish;

    @NotNull(message = "Request date is required")
    private Date requestDate;

    @NotNull(message = "Consignment type is required")
    private boolean consignmentType;

    @NotNull(message = "Agreed price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Agreed price must be greater than zero")
    private BigDecimal agreedPrice;

    @NotNull(message = "Status is required")
    private boolean status;

    @NotNull(message = "Shop price is required")
    private boolean shopPrice;

    @NotNull(message = "Category is required")
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}

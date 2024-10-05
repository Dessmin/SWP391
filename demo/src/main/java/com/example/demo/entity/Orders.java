package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Integer orderID;

    @NotNull(message = "User ID is required")
    private Integer userID;

    @NotNull(message = "Order date is required")
    @PastOrPresent(message = "Order date cannot be in the future")
    private Date orderDate;

    @NotNull(message = "Total amount is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Total amount must be greater than zero")
    private BigDecimal totalAmount;

    @NotBlank(message = "Order status is required")
    @Size(max = 50, message = "Order status must not exceed 50 characters")
    private String orderStatus;

    @NotNull(message = "Payment ID is required")
    private BigDecimal paymentID;
}

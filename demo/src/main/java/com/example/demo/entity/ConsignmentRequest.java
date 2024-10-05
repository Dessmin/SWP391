package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
public class ConsignmentRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Integer consignmentID;

    @NotNull(message = "User ID is required")
    private Integer userID;

    @NotNull(message = "Koi ID is required")
    private Integer koiID;

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

    @NotNull(message = "Category ID is required")
    private BigDecimal categoryID;
}

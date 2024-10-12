package com.koishop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class OrderDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Integer orderDetailID;

    @NotNull(message = "Order ID is required")
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Orders orders;

    private Integer productId;

    private ProductType productType;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;

    @NotNull(message = "Unit price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Unit price must be greater than zero")
    private Double unitPrice;

}

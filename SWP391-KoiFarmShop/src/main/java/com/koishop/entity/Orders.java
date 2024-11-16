package com.koishop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Integer orderID;

    @NotNull
    @Enumerated(EnumType.STRING)
    private TypeOrder type;

    @NotNull(message = "User ID is required")
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull(message = "Order date is required")
    @PastOrPresent(message = "Order date cannot be in the future")
    private Date orderDate;

    @NotNull(message = "Total amount is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Total amount must be greater than zero")
    private Double totalAmount;

    @NotBlank(message = "Order status is required")
    @Size(max = 50, message = "Order status must not exceed 50 characters")
    private String orderStatus;

    @NotBlank(message = "Delivery status status is required")
    @Size(max = 50, message = "Delivery status must not exceed 50 characters")
    private String deliveryStatus;

    @OneToOne(mappedBy = "orders")
    @JsonIgnore
    private Payment payment;

    @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL)
    private List<OrderDetails> orderDetails;

    @OneToOne(mappedBy = "orders")
    @JsonIgnore
    private RatingsFeedbacks ratingsFeedbacks;

    private boolean deleted;

}

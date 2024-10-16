package com.koishop.models.orders_model;

import com.koishop.entity.OrderDetails;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class OrderResponse {
    private Integer orderID;

    private String userName;

    private Date orderDate;

    private Double totalAmount;

    private String orderStatus;

    private int paymentId;

    @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL)
    private List<OrderDetails> orderDetails;
}

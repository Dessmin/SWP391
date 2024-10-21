package com.koishop.models.orders_model;

import com.koishop.models.orderdetails_model.OrderDetailsRequest;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private double totalAmount;

    private List<OrderDetailsRequest> orderDetails;
}

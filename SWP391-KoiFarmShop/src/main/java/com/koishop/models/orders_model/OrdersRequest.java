package com.koishop.models.orders_model;

import com.koishop.models.orderdetails_model.OrderDetailsRequest;
import lombok.Data;

import java.util.List;

@Data
public class OrdersRequest {
    private List<OrderDetailsRequest> orderDetails;
}

package com.koishop.models.orders_model;

import com.koishop.models.orderdetails_model.OrderDetailResponse;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class OrdersResponse {
        private Integer orderID;
        private Date orderDate;
        private String orderStatus;
        private Float totalAmount;
        private List<OrderDetailResponse> orderDetails;
    }


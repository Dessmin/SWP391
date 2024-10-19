package com.koishop.models.orders_model;


import lombok.Data;

import java.util.Date;

@Data
public class ViewOrdersOnly {
    private Integer orderID;

    private String userName;

    private Date orderDate;

    private Double totalAmount;

    private String orderStatus;
}

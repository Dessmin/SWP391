package com.koishop.models.orders_model;


import com.koishop.entity.TypeOrder;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

import java.util.Date;

@Data
public class ViewOrdersOnly {
    private Integer orderID;

    @Enumerated(EnumType.STRING)
    private TypeOrder type;

    private String userName;

    private Date orderDate;

    private Double totalAmount;

    private String orderStatus;
}

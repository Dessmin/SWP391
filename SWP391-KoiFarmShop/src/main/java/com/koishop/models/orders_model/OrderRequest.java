package com.koishop.models.orders_model;

import com.koishop.entity.TypeOrder;
import com.koishop.models.orderdetails_model.OrderDetailsRequest;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private double totalAmount;

    @Enumerated(EnumType.STRING)
    private TypeOrder type;

    private List<OrderDetailsRequest> orderDetails;
}

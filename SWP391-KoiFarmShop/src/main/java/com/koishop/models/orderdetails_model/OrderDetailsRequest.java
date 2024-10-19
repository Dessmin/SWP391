package com.koishop.models.orderdetails_model;


import com.koishop.entity.ProductType;
import lombok.Data;

@Data
public class OrderDetailsRequest {
    private Integer productId;
    private ProductType productType;
    private int quantity;
    private double unitPrice;

}

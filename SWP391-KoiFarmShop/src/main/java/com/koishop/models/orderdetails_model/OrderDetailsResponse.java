package com.koishop.models.orderdetails_model;


import com.koishop.entity.ProductType;
import lombok.Data;

@Data
public class OrderDetailsResponse {

    private Integer orderDetailID;

    private Integer orderId;

    private Integer productId;

    private ProductType productType;

    private Integer quantity;

    private Double unitPrice;

}

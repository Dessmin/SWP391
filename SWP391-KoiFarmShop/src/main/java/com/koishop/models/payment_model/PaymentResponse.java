package com.koishop.models.payment_model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.koishop.entity.Orders;
import com.koishop.entity.PaymentMethod;
import com.koishop.entity.Transactions;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class PaymentResponse {

    private Integer paymentID;

    private String description;

    Date createAt;

    PaymentMethod paymentMethod;

    private Integer orderId;
}

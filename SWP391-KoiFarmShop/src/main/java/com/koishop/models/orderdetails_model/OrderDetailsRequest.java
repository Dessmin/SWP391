package com.koishop.models.orderdetails_model;

import com.koishop.entity.KoiFish;
import com.koishop.models.fish_model.ViewFish;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderDetailsRequest {
    private Integer koiID;

    private Integer quantity;

}

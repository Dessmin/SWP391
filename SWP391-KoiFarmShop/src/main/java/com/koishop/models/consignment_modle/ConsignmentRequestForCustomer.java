package com.koishop.models.consignment_modle;

import com.koishop.entity.ConsignmentType;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
@Data
public class ConsignmentRequestForCustomer {
    private Integer fishId;
    @FutureOrPresent(message = "Start date must be in the present or future")
    private LocalDate startDate;


    @Future(message = "End date must be in the future")
    private LocalDate endDate;
    private ConsignmentType consignmentType;
    private double shopPrice;
    private Integer packId;  // Optional, for offline consignment


}

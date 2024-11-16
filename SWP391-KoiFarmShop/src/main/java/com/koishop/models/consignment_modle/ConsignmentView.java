package com.koishop.models.consignment_modle;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.koishop.entity.ConsignmentType;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
@Data
public class ConsignmentView {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private int id;
    @NotNull(message = "User is required")
    private String userName;

    @NotNull(message = "Koi is required")
    private String fishName;


    @FutureOrPresent(message = "Start date must be in the present or future")
    private LocalDate startDate;


    @Future(message = "End date must be in the future")
    private LocalDate endDate;

    @NotNull(message = "Consignment type is required")
    private ConsignmentType consignmentType;

    private String status;

    private double shopPrice;
}

package com.koishop.models.consignment_modle;

import com.koishop.entity.ConsignmentType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;
@Data
public class ConsignmentRequestForCustomer {

    @NotNull(message = "Koi is required")
    private Integer fishId;

    @NotNull(message = "Request date is required")
    private Date requestDate;

    @NotNull(message = "Consignment type is required")
    private ConsignmentType consignmentType;
}

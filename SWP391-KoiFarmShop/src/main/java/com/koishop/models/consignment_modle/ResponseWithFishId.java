package com.koishop.models.consignment_modle;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.koishop.entity.ConsignmentType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class ResponseWithFishId {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private int id;
    @NotNull(message = "User is required")
    private String userName;

    private int koiFishId;

    @NotNull(message = "Koi is required")
    private String fishName;

    @NotNull(message = "Request date is required")
    private Date requestDate;

    @NotNull(message = "Consignment type is required")
    private ConsignmentType consignmentType;

    private boolean status;

    private double shopPrice;
}

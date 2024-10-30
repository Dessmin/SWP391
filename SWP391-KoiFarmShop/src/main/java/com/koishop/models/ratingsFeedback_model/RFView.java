package com.koishop.models.ratingsFeedback_model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.Date;

@Data
public class RFView {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private int id;
    private String userName;
    private int ordersId;
    private Integer rating;
    private String feedback;
    private Date feedbackDate;
}

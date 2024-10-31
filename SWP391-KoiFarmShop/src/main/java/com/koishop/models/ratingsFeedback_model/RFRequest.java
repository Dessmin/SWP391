package com.koishop.models.ratingsFeedback_model;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RFRequest {
    @NotNull(message = "Order is required")
    private int ordersId;

    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be no more than 5")
    private Integer rating;

    @NotBlank(message = "Feedback is required")
    private String feedback;
}

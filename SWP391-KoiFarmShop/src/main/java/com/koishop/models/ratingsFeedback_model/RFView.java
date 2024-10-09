package com.koishop.models.ratingsFeedback_model;

import com.koishop.entity.KoiFish;
import com.koishop.entity.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.Date;

@Data
public class RFView {
    private String userName;

    @NotNull(message = "KoiFish is required")
    private String fishName;

    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be no more than 5")
    private Integer rating;

    @NotBlank(message = "Feedback is required")
    private String feedback;

    @NotNull(message = "Feedback date is required")
    @PastOrPresent(message = "Feedback date cannot be in the future")
    private Date feedbackDate;
}

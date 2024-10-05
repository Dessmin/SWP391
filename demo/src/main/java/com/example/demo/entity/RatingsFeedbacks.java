package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
public class RatingsFeedbacks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Integer ratingID;

    @NotNull(message = "User ID is required")
    private Integer userID;

    @NotNull(message = "Koi ID is required")
    private Integer koiID;

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

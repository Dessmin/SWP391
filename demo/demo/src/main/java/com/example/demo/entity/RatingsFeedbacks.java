package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
public class RatingsFeedbacks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Integer ratingID;

    @NotNull(message = "User ID is required")
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull(message = "Koi ID is required")
    @ManyToOne
    @JoinColumn(name = "koifish_id")
    private KoiFish koiFish;

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

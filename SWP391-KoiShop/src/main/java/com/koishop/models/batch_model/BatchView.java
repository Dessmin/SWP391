package com.koishop.models.batch_model;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BatchView {
    @NotBlank(message = "Breed is required")
    private String breed;

    @NotBlank(message = "Description is required")
    private String description;

    private String image;

    private int quantity;

    private String price;
}

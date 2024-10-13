package com.koishop.models.batch_model;

import com.koishop.entity.Breeds;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BatchDetailUpdate {
    @NotBlank(message = "breed is required")
    private String breed;

    @NotBlank(message = "Description is required")
    private String description;
    @NotBlank(message = "image is required")
    private String image;
    @NotNull(message = "quantity is required")
    private int quantity;
    @NotNull(message = "price is required")
    private double price;
    private Boolean isSale;
}

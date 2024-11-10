package com.koishop.models.batch_model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BatchForManager {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private int id;

    @NotBlank(message = "Breed is required")
    private String breedName;

    @NotBlank(message = "Description is required")
    private String description;

    private String image;

    private int quantity;

    private double price;

    private boolean isForSale;

    private boolean deleted;
}

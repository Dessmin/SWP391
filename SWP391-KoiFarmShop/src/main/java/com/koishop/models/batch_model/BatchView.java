package com.koishop.models.batch_model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BatchView {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private int id;

    @NotBlank(message = "Breed is required")
    private String breed;

    @NotBlank(message = "Description is required")
    private String description;

    private String image;

    private int quantity;

    private String price;
}

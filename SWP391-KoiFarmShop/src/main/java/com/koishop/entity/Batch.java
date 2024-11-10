package com.koishop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Batch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Integer batchID;

    @ManyToOne
    @JoinColumn(name = "breed_id")
    @NotNull(message = "Breed is required")
    private Breeds breed;

    @NotBlank(message = "Description is required")
    private String description;

    private String image;

    private int quantity;

    private double price;

    private Boolean isForSale;

    private boolean deleted;
}

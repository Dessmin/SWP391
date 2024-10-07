package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
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

    @OneToOne
    @JoinColumn(name = "breed_id")
    private Breeds breed;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Status is required")
    private Boolean status;
}

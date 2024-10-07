package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Entity
@Getter
@Setter
public class Breeds {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Integer breedID;

    @NotBlank(message = "Breed name is required")
    @Size(max = 100, message = "Breed name must not exceed 100 characters")
    private String breedName;

    @NotBlank(message = "Description is required")
    private String description;

    @JsonIgnore
    @OneToOne(mappedBy = "breed")
    private Batch batch;

    @OneToMany(mappedBy = "breed")
    @JsonIgnore
    private List<KoiFish> koiFishList;
}

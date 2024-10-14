package com.koishop.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Certificate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Integer certificateID;

    @Column(unique = true)
    @NotBlank(message = "Image is required")
    private String image;

    @ManyToOne
    @JoinColumn(name = "koifish_id")
    private KoiFish koiFish;
}

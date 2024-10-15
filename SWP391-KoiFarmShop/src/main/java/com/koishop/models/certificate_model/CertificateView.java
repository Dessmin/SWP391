package com.koishop.models.certificate_model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CertificateView {

    private Integer certificateID;
    @Column(unique = true)
    @NotBlank(message = "Image is required")
    private String image;
}

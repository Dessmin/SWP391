package com.koishop.models.certificate_model;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CertificateRequest {
    @Column(unique = true)
    @NotBlank(message = "Image is required")
    private String image;
}

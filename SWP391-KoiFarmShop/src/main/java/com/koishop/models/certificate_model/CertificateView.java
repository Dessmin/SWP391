package com.koishop.models.certificate_model;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CertificateView {
    @NotBlank(message = "Link is required")
    private String link;

    @NotBlank(message = "koiFish is required")
    private String koiFish;
}

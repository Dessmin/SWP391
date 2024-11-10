package com.koishop.api;

import com.koishop.models.certificate_model.CertificateRequest;
import com.koishop.models.certificate_model.CertificateView;
import com.koishop.service.CertificateService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "https://deploy-fe-kappa.vercel.app"})
@SecurityRequirement(name = "api")
@RestController
@RequestMapping("/api/certificates")
public class CertificateAPI {

    @Autowired
    private CertificateService certificateService;

    @GetMapping("list-certificates")
    public List<CertificateView> getAllCertificates() {
        return certificateService.getAllCertificates();
    }


    @PostMapping("/{koiId}/add-certificate")
    @PreAuthorize("hasAuthority('Manager')")
    public CertificateView createCertificate(@PathVariable Integer koiId , @Valid @RequestBody CertificateRequest certificate) {
        return certificateService.createCertificate(koiId, certificate);
    }

    @PutMapping("/{certificateID}")
    @PreAuthorize("hasAuthority('Manager')")
    public CertificateView updateCertificate(@PathVariable int certificateID, @Valid @RequestBody CertificateView certificateDetails) {
        return certificateService.updateCertificate(certificateID, certificateDetails);
    }

    @GetMapping("/{certificateID}/detail")
    public CertificateView getCertificateDetail(@PathVariable int certificateID) {
        return certificateService.getCertificate(certificateID);
    }

    @GetMapping("/{fishId}/fish-certificate")
    public List<CertificateView> getCertificatesByFishName(@PathVariable Integer fishId) {
        return certificateService.getCertificatesByFish(fishId);
    }

    @DeleteMapping("/{certificateID}")
    @PreAuthorize("hasAuthority('Manager')")
    public ResponseEntity<Void> deleteCertificate(@PathVariable int certificateID) {
        certificateService.deleteCertificate(certificateID);
        return ResponseEntity.noContent().build();
    }
}

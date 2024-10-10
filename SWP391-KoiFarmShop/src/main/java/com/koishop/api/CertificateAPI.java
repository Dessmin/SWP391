package com.koishop.api;

import com.koishop.models.certificate_model.CertificateView;
import com.koishop.service.CertificateService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8080/")
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


    @PostMapping("add-cetificate")
    public CertificateView createCertificate(@RequestBody CertificateView certificate) {
        return certificateService.createCertificate(certificate);
    }

    @PutMapping("/{certificateID}")
    public CertificateView updateCertificate(@PathVariable int certificateID, @RequestBody CertificateView certificateDetails) {
        return certificateService.updateCertificate(certificateID, certificateDetails);
    }

    @GetMapping("/{certificateID}/detail")
    public CertificateView getCertificateDetail(@PathVariable int certificateID) {
        return certificateService.getCertificate(certificateID);
    }

    @GetMapping("/{fishName}/fish-certificate")
    public List<String> getCertificatesByFishName(@PathVariable String fishName) {
        return certificateService.getCertificatesByFish(fishName);
    }

    @DeleteMapping("/{certificateID}")
    public ResponseEntity<Void> deleteCertificate(@PathVariable int certificateID) {
        certificateService.deleteCertificate(certificateID);
        return ResponseEntity.noContent().build();
    }
}

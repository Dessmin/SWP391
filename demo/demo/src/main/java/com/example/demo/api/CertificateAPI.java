package com.example.demo.api;

import com.example.demo.entity.Certificate;
import com.example.demo.service.CertificateService;
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
    public List<Certificate> getAllCertificates() {
        return certificateService.getAllCertificates();
    }


    @PostMapping("add-cetificate")
    public Certificate createCertificate(@RequestBody Certificate certificate) {
        return certificateService.createCertificate(certificate);
    }

    @PutMapping("/{certificateID}")
    public ResponseEntity<Certificate> updateCertificate(@PathVariable int certificateID, @RequestBody Certificate certificateDetails) {
        try {
            Certificate updatedCertificate = certificateService.updateCertificate(certificateID, certificateDetails);
            return ResponseEntity.ok(updatedCertificate);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{certificateID}")
    public ResponseEntity<Void> deleteCertificate(@PathVariable int certificateID) {
        certificateService.deleteCertificate(certificateID);
        return ResponseEntity.noContent().build();
    }
}

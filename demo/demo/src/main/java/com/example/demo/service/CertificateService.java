package com.example.demo.service;

import com.example.demo.entity.Certificate;
import com.example.demo.repository.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CertificateService {


    @Autowired
    private CertificateRepository certificateRepository;

    public List<Certificate> getAllCertificates() {
        return certificateRepository.findAll();
    }



    public Certificate createCertificate(Certificate certificate) {
        return certificateRepository.save(certificate);
    }

    public Certificate updateCertificate(int id, Certificate certificateDetails) {
        Certificate certificate = certificateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificate not found"));
//        certificate.setLink(certificateDetails.getLink());
        return certificateRepository.save(certificate);
    }

    public void deleteCertificate(int id) {
        certificateRepository.deleteById(id);
    }
}

package com.koishop.service;

import com.koishop.entity.Certificate;
import com.koishop.entity.KoiFish;
import com.koishop.models.certificate_model.CertificateRequest;
import com.koishop.models.certificate_model.CertificateView;
import com.koishop.repository.CertificateRepository;
import com.koishop.repository.KoiFishRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CertificateService {


    @Autowired
    private CertificateRepository certificateRepository;
    @Autowired
    @Lazy
    private ModelMapper modelMapper;
    @Autowired
    private KoiFishRepository koiFishRepository;

    public List<CertificateView> getAllCertificates() {
        List<CertificateView> certificateViews = new ArrayList<>();
        for (Certificate certificate : certificateRepository.findAll()) {
            certificateViews.add(modelMapper.map(certificate, CertificateView.class));
        }
        return certificateViews;
    }

    public CertificateView createCertificate(Integer id, CertificateRequest certificate) {
        Certificate newCertificate = modelMapper.map(certificate, Certificate.class);
        KoiFish koiFish = koiFishRepository.findKoiFishByKoiID(id);
        newCertificate.setKoiFish(koiFish);
        certificateRepository.save(newCertificate);
        return modelMapper.map(newCertificate, CertificateView.class);
    }

    public CertificateView updateCertificate(int id, CertificateView certificateDetails) {
        Certificate certificate = certificateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificate not found"));
        certificate.setImage(certificateDetails.getImage());
        certificateRepository.save(certificate);
        return certificateDetails;
    }

    public CertificateView getCertificate(int id) {
        Certificate certificate = certificateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificate not found"));
        return modelMapper.map(certificate, CertificateView.class);
    }

    public List<CertificateView> getCertificatesByFish(Integer fishId) {
        List<CertificateView> certificateViews = new ArrayList<>();
        for (Certificate certificate : certificateRepository.findAll()) {
            if (certificate.getKoiFish().getKoiID().equals(fishId)) {
                certificateViews.add(modelMapper.map(certificate, CertificateView.class));
            }
        }
        return certificateViews;
    }

    public void deleteCertificate(int id) {
        certificateRepository.deleteById(id);
    }
}

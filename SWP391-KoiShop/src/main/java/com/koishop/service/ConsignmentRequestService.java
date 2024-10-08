package com.koishop.service;

import com.koishop.entity.ConsignmentRequest;
import com.koishop.repository.ConsignmentRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsignmentRequestService {
    @Autowired
    private ConsignmentRequestRepository repository;

    public List<ConsignmentRequest> getAllConsignmentRequests() {
        return repository.findAll();
    }


    public ConsignmentRequest createConsignmentRequest(ConsignmentRequest request) {
        return repository.save(request);
    }

    public ConsignmentRequest updateConsignmentRequest(int id, ConsignmentRequest requestDetails) {
        ConsignmentRequest request = repository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));

//        request.setUserID(requestDetails.getUserID());
//        request.setKoiID(requestDetails.getKoiID());
//        request.setRequestDate(requestDetails.getRequestDate());
//        request.setConsignmentType(requestDetails.isConsignmentType());
//        request.setAgreedPrice(requestDetails.getAgreedPrice());
//        request.setStatus(requestDetails.isStatus());
//        request.setShopPrice(requestDetails.isShopPrice());
//        request.setCategoryID(requestDetails.getCategoryID());

        return repository.save(request);
    }

    public void deleteConsignmentRequest(int id) {
        repository.deleteById(id);
    }
}

package com.koishop.service;

import com.koishop.entity.ConsignmentRequest;
import com.koishop.entity.KoiFish;
import com.koishop.entity.User;
import com.koishop.models.consignment_modle.ConsignmentRequestForCustomer;
import com.koishop.models.consignment_modle.ConsignmentView;
import com.koishop.repository.ConsignmentRequestRepository;
import com.koishop.repository.KoiFishRepository;
import com.koishop.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ConsignmentRequestService {
    @Autowired
    private ConsignmentRequestRepository requestRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserService userService;
    @Autowired
    private KoiFishRepository koiFishRepository;
    @Autowired
    private UserRepository userRepository;

    public List<ConsignmentView> getAllConsignmentRequests() {
        List<ConsignmentView> consignmentViews = new ArrayList<>();
        for (ConsignmentRequest consignmentRequest : requestRepository.findAll()) {
            ConsignmentView consignmentView = modelMapper.map(consignmentRequest, ConsignmentView.class);
            consignmentView.setUserName(consignmentRequest.getUser().getUsername());
            consignmentView.setFishName(consignmentRequest.getKoiFish().getFishName());
            consignmentViews.add(consignmentView);
        }
        return consignmentViews;
    }

    public List<ConsignmentView> getAllConsignmentRequestsForCustomer() {
        List<ConsignmentView> consignmentViews = new ArrayList<>();
        for (ConsignmentRequest consignmentRequest : requestRepository.findAll()) {
            ConsignmentView consignmentView = modelMapper.map(consignmentRequest, ConsignmentView.class);
            consignmentView.setUserName(consignmentRequest.getUser().getUsername());
            consignmentView.setFishName(consignmentRequest.getKoiFish().getFishName());
            consignmentViews.add(consignmentView);
        }
        return consignmentViews;
    }

    public ConsignmentRequestForCustomer createConsignmentRequest(ConsignmentRequestForCustomer request) {
        ConsignmentRequest newRequest = modelMapper.map(request, ConsignmentRequest.class);
        newRequest.setUser(userService.getCurrentUser());
        KoiFish koiFish = koiFishRepository.findKoiFishByFishName(request.getFishName());
        newRequest.setKoiFish(koiFish);
        newRequest.setRequestDate(new Date());
        requestRepository.save(newRequest);
        return request;
    }

    public ConsignmentView getConsignmentRequestById(Integer id) {
        ConsignmentRequest request = requestRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        ConsignmentView consignmentView = modelMapper.map(request, ConsignmentView.class);
        consignmentView.setUserName(request.getUser().getUsername());
        consignmentView.setFishName(request.getKoiFish().getFishName());
        return consignmentView;
    }

    public ConsignmentView updateConsignmentRequest(int id, ConsignmentView requestDetails) {
        ConsignmentRequest request = requestRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        modelMapper.map(requestDetails, request);
        KoiFish koiFish = koiFishRepository.findKoiFishByFishName(requestDetails.getFishName());
        request.setKoiFish(koiFish);
        User user = userRepository.findByUserName(requestDetails.getUserName());
        request.setUser(user);
        requestRepository.save(request);
        return requestDetails;
    }

    public void deleteConsignmentRequest(int id) {
        requestRepository.deleteById(id);
    }
}

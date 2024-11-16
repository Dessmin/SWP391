package com.koishop.service;

import com.koishop.entity.*;
import com.koishop.exception.EntityNotFoundException;
import com.koishop.models.consignment_modle.ConsignmentRequestForCustomer;
import com.koishop.models.consignment_modle.ConsignmentView;
import com.koishop.models.consignment_modle.ResponseWithFishId;
import com.koishop.repository.ConsignmentRequestRepository;
import com.koishop.repository.KoiFishRepository;
import com.koishop.repository.PackRepository;
import com.koishop.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
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
    @Autowired
    private PackRepository packRepository;

//    public List<ConsignmentView> getAllConsignmentRequests() {
//        List<ConsignmentView> consignmentViews = new ArrayList<>();
//        for (ConsignmentRequest consignmentRequest : requestRepository.findAll()) {
//            ConsignmentView consignmentView = modelMapper.map(consignmentRequest, ConsignmentView.class);
//            consignmentView.setUserName(consignmentRequest.getUser().getUsername());
//            consignmentView.setFishName(consignmentRequest.getKoiFish().getFishName());
//            consignmentViews.add(consignmentView);
//        }
//        return consignmentViews;
//    }

    public List<ConsignmentView> getConsignmentRequestsByType(ConsignmentType type) {
        List<ConsignmentView> consignmentViews = new ArrayList<>();
        List<ConsignmentRequest> consignmentRequests;

        if (type == null) {
            consignmentRequests = requestRepository.findAll();
        } else {
            consignmentRequests = requestRepository.findByConsignmentType(type);
        }

        for (ConsignmentRequest consignmentRequest : consignmentRequests) {
            ConsignmentView consignmentView = modelMapper.map(consignmentRequest, ConsignmentView.class);
            consignmentView.setUserName(consignmentRequest.getUser().getUsername());
            consignmentView.setFishName(consignmentRequest.getKoiFish().getFishName());
            consignmentViews.add(consignmentView);
        }

        return consignmentViews;
    }

    public List<ResponseWithFishId> getAllConsignmentRequestsForCustomer() {
        List<ResponseWithFishId> consignmentResponses = new ArrayList<>();
        User user = userService.getCurrentUser();
        for (ConsignmentRequest consignmentRequest : requestRepository.findAll()) {
            if (consignmentRequest.getUser().getUsername().equals(user.getUsername())) {
                ResponseWithFishId consignmentView = modelMapper.map(consignmentRequest, ResponseWithFishId.class);
                consignmentView.setKoiFishId(consignmentRequest.getKoiFish().getKoiID());
                consignmentView.setUserName(consignmentRequest.getUser().getUsername());
                consignmentView.setFishName(consignmentRequest.getKoiFish().getFishName());
                consignmentResponses.add(consignmentView);
            }
        }
        return consignmentResponses;
    }

//    public List<ConsignmentView> getConsignmentOnline() {
//        List<ConsignmentView> consignmentViews = new ArrayList<>();
//        for (ConsignmentRequest consignmentRequest : requestRepository.findByConsignmentType(ConsignmentType.Online)) {
//            ConsignmentView consignmentView = modelMapper.map(consignmentRequest, ConsignmentView.class);
//            consignmentView.setUserName(consignmentRequest.getUser().getUsername());
//            consignmentView.setFishName(consignmentRequest.getKoiFish().getFishName());
//            consignmentViews.add(consignmentView);
//        }
//        return consignmentViews;
//    }
//
//    public List<ConsignmentView> getConsignmentOffline() {
//        List<ConsignmentView> consignmentViews = new ArrayList<>();
//        for (ConsignmentRequest consignmentRequest : requestRepository.findByConsignmentType(ConsignmentType.Offline)) {
//            ConsignmentView consignmentView = modelMapper.map(consignmentRequest, ConsignmentView.class);
//            consignmentView.setUserName(consignmentRequest.getUser().getUsername());
//            consignmentView.setFishName(consignmentRequest.getKoiFish().getFishName());
//            consignmentViews.add(consignmentView);
//        }
//        return consignmentViews;
//    }

    public ConsignmentRequestForCustomer createConsignmentRequest(ConsignmentRequestForCustomer request) {
        ConsignmentRequest newRequest = new ConsignmentRequest();
        newRequest.setUser(userService.getCurrentUser());

        // Lấy thông tin KoiFish từ fishId và thiết lập cho ConsignmentRequest
        KoiFish koiFish = koiFishRepository.findKoiFishByKoiID(request.getFishId());
        if (koiFish == null) throw new RuntimeException("KoiFish not found!");
        newRequest.setKoiFish(koiFish);

        // Thiết lập các thuộc tính chung
        newRequest.setStartDate(request.getStartDate());
        newRequest.setConsignmentType(request.getConsignmentType());

        // Kiểm tra consignment type để gán các thuộc tính tương ứng
        if (request.getConsignmentType() == ConsignmentType.Offline) {
            if (request.getStartDate() == null) {
                throw new IllegalArgumentException("Start date is required for Offline consignment");
            }
            newRequest.setStartDate(request.getStartDate());


            // Lấy Pack từ packId và thiết lập giá dựa trên pack
            Pack pack = packRepository.findById(request.getPackId())
                    .orElseThrow(() -> new RuntimeException("Pack not found"));
            newRequest.setPack(pack);
            newRequest.setShopPrice(pack.getPrice());

            LocalDate endDate = request.getStartDate().plusMonths(pack.getDurationMonths());
            newRequest.setEndDate(endDate);


        } else {
            // Với online consignment, chỉ thiết lập shop price
            newRequest.setShopPrice(request.getShopPrice());
            koiFish.setPrice(request.getShopPrice()); // Cập nhật giá của KoiFish
            newRequest.setStartDate(LocalDate.now());
        }

        // Thiết lập trạng thái mặc định cho consignment request
        newRequest.setStatus("PENDING");

        // Lưu consignment request vào cơ sở dữ liệu
        requestRepository.save(newRequest);

        return request;
    }



    public ConsignmentView getConsignmentRequestById(Integer id) {
        ConsignmentRequest request = requestRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Not found"));
        ConsignmentView consignmentView = modelMapper.map(request, ConsignmentView.class);
        consignmentView.setUserName(request.getUser().getUsername());
        consignmentView.setFishName(request.getKoiFish().getFishName());
        return consignmentView;
    }

    public ConsignmentView updateConsignmentRequest(int id, ConsignmentView requestDetails) {
        ConsignmentRequest request = requestRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Not found"));
        KoiFish koiFish = koiFishRepository.findKoiFishByFishName(requestDetails.getFishName());
        request.setKoiFish(koiFish);
        User user = userRepository.findByUserName(requestDetails.getUserName());
        request.setUser(user);
        request.setStartDate(request.getStartDate());
        request.setStatus(requestDetails.getStatus());
        request.setShopPrice(requestDetails.getShopPrice());
        requestRepository.save(request);
        return requestDetails;
    }

    public void updateConsignmentStatus(int id, String status) {
        ConsignmentRequest consignmentRequest = requestRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Consignment not found!"));

        consignmentRequest.setStatus(status);
        requestRepository.save(consignmentRequest);
    }

    public void deleteConsignmentRequest(int id) {
        requestRepository.deleteById(id);
    }
}

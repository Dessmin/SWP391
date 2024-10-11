package com.koishop.api;

import com.koishop.entity.ConsignmentRequest;
import com.koishop.models.consignment_modle.ConsignmentRequestForCustomer;
import com.koishop.models.consignment_modle.ConsignmentView;
import com.koishop.service.ConsignmentRequestService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8080/")
@SecurityRequirement(name = "api")
@RestController
@RequestMapping("/api/consignments")
public class ConsignmentRequestAPI {


    @Autowired
    private ConsignmentRequestService consignmentRequestService;

    @GetMapping("list-consignments")
    public List<ConsignmentView> getAllConsignmentRequests() {
        return consignmentRequestService.getAllConsignmentRequests();
    }

    @GetMapping("/{consignmentID}/get")
    public ConsignmentView getConsignmentRequest(@PathVariable int consignmentID) {
        return consignmentRequestService.getConsignmentRequestById(consignmentID);
    }

    @GetMapping("/getforCustomer")
    public List<ConsignmentView> getConsignmentRequestForCustomer() {
        return consignmentRequestService.getAllConsignmentRequestsForCustomer();
    }

    @PostMapping("add-consignment")
    public ConsignmentRequestForCustomer createConsignmentRequest(@RequestBody ConsignmentRequestForCustomer request) {
        return consignmentRequestService.createConsignmentRequest(request);
    }

    @PutMapping("/{consignmentID}/update")
    public ConsignmentView updateConsignmentRequest(@PathVariable int consignmentID, @RequestBody ConsignmentView requestDetails) {
        return consignmentRequestService.updateConsignmentRequest(consignmentID, requestDetails);
    }

    @DeleteMapping("/{consignmentID}")
    public ResponseEntity<Void> deleteConsignmentRequest(@PathVariable int consignmentID) {
        consignmentRequestService.deleteConsignmentRequest(consignmentID);
        return ResponseEntity.noContent().build();
    }
}

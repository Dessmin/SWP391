package com.koishop.api;

import com.koishop.models.consignment_modle.ConsignmentRequestForCustomer;
import com.koishop.models.consignment_modle.ConsignmentView;
import com.koishop.models.consignment_modle.ResponseWithFishId;
import com.koishop.service.ConsignmentRequestService;
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
    public List<ResponseWithFishId> getConsignmentRequestForCustomer() {
        return consignmentRequestService.getAllConsignmentRequestsForCustomer();
    }

    @PostMapping("add-consignment")
    public ConsignmentRequestForCustomer createConsignmentRequest(@Valid @RequestBody ConsignmentRequestForCustomer request) {
        return consignmentRequestService.createConsignmentRequest(request);
    }

    @PutMapping("/{consignmentID}/update")
    @PreAuthorize("hasAuthority('Manager') or hasAuthority('Staff')")
    public ConsignmentView updateConsignmentRequest(@PathVariable int consignmentID, @Valid @RequestBody ConsignmentView requestDetails) {
        return consignmentRequestService.updateConsignmentRequest(consignmentID, requestDetails);
    }

    @DeleteMapping("/{consignmentID}")
    @PreAuthorize("hasAuthority('Manager')")
    public ResponseEntity<Void> deleteConsignmentRequest(@PathVariable int consignmentID) {
        consignmentRequestService.deleteConsignmentRequest(consignmentID);
        return ResponseEntity.noContent().build();
    }
}

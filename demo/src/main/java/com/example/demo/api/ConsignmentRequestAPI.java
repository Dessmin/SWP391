package com.example.demo.api;

import com.example.demo.entity.ConsignmentRequest;
import com.example.demo.service.ConsignmentRequestService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8080/")
@SecurityRequirement(name = "api")
@RestController
@RequestMapping("/api/consignments")
public class ConsignmentRequestAPI {


    @Autowired
    private ConsignmentRequestService service;

    @GetMapping("list-consignments")
    public List<ConsignmentRequest> getAllConsignmentRequests() {
        return service.getAllConsignmentRequests();
    }

    @PostMapping("add-consignment")
    public ConsignmentRequest createConsignmentRequest(@RequestBody ConsignmentRequest request) {
        return service.createConsignmentRequest(request);
    }

    @PutMapping("/{consignmentID}")
    public ResponseEntity<ConsignmentRequest> updateConsignmentRequest(@PathVariable int consignmentID, @RequestBody ConsignmentRequest requestDetails) {
        return ResponseEntity.ok(service.updateConsignmentRequest(consignmentID, requestDetails));
    }

    @DeleteMapping("/{consignmentID}")
    public ResponseEntity<Void> deleteConsignmentRequest(@PathVariable int consignmentID) {
        service.deleteConsignmentRequest(consignmentID);
        return ResponseEntity.noContent().build();
    }
}

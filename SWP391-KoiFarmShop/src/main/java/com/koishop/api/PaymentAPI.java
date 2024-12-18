package com.koishop.api;


import com.koishop.models.payment_model.PaymentResponse;
import com.koishop.service.PaymentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "https://deploy-fe-kappa.vercel.app"})
@SecurityRequirement(name = "api")
@RestController
@RequestMapping("/api/payments")
public class PaymentAPI {
    @Autowired
    private PaymentService paymentService;

    @GetMapping("/{paymentId}/get-payment")
    public ResponseEntity getPaymentById(Integer paymentId) {
        PaymentResponse response = paymentService.getPaymentById(paymentId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{orderId}/order-payment")
    public ResponseEntity getPaymentByOrder(@PathVariable Integer orderId) {
        PaymentResponse response = paymentService.getPaymentByOrder(orderId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{paymentID}")
    @PreAuthorize("hasAuthority('Manager')")
    public ResponseEntity<Void> deletePayment(@PathVariable int paymentID) {
        paymentService.deletePayment(paymentID);
        return ResponseEntity.noContent().build();
    }


}

package com.koishop.api;

import com.koishop.entity.Payment;
import com.koishop.models.payment_model.PaymentResponse;
import com.koishop.service.PaymentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
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

    @GetMapping("/{orderId}/list-order-payments")
    public ResponseEntity getPaymentByOrder(@PathVariable Integer orderId) {
        PaymentResponse response = paymentService.getPaymentByOrder(orderId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{paymentID}")
    public ResponseEntity<Void> deletePayment(@PathVariable int paymentID) {
        paymentService.deletePayment(paymentID);
        return ResponseEntity.noContent().build();
    }
//    @GetMapping("/list-payments")
//    public ResponseEntity getAllPayments() {
//        List<PaymentResponse> response = paymentService.getAllPayments();
//        return ResponseEntity.ok(response);
//    }
//
//    @GetMapping("/list-user-payments")
//    public ResponseEntity getPaymentByUser() {
//        List<PaymentResponse> response = paymentService.getPaymentByUser();
//        return ResponseEntity.ok(response);
//    }





//    // Create new payment
//    @PostMapping("add-payment")
//    public ResponseEntity createPayment(@RequestBody PaymentResponse paymentResponse) {
//        PaymentResponse payment = paymentService.createPayment(paymentResponse);
//        return ResponseEntity.ok(payment);
//    }
//
//    // Update payment by ID
//    @PutMapping("/{paymentID}")
//    public ResponseEntity<Payment> updatePayment(@PathVariable int paymentID, @RequestBody Payment updatedPayment) {
//        try {
//            Payment payment = paymentService.updatePayment(paymentID, updatedPayment);
//            return ResponseEntity.ok(payment);
//        } catch (RuntimeException e) {
//            return ResponseEntity.notFound().build();
//        }
//    }


}

package com.koishop.service;

import com.koishop.entity.Payment;
import com.koishop.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }



    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Payment updatePayment(int id, Payment updatedPayment) {
        return paymentRepository.findById(id)
                .map(payment -> {
//                    payment.setDescription(updatedPayment.getDescription());
                    return paymentRepository.save(payment);
                })
                .orElseThrow(() -> new RuntimeException("Payment not found with id " + id));
    }

    public void deletePayment(int id) {
        paymentRepository.deleteById(id);
    }
}

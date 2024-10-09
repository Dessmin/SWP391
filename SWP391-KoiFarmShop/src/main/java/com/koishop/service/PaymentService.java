package com.koishop.service;

import com.koishop.entity.Payment;
import com.koishop.models.payment_model.PaymentResponse;
import com.koishop.repository.OrdersRepository;
import com.koishop.repository.PaymentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    OrdersRepository ordersRepository;

    @Autowired
    ModelMapper modelMapper;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }



    public PaymentResponse createPayment(PaymentResponse paymentResponse) {

        Payment payment = modelMapper.map(paymentResponse, Payment.class);

        return modelMapper.map(paymentRepository.save(payment), PaymentResponse.class);
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

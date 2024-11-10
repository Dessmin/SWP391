package com.koishop.service;


import com.koishop.entity.Orders;
import com.koishop.entity.Payment;
import com.koishop.entity.User;
import com.koishop.exception.EntityNotFoundException;
import com.koishop.models.payment_model.PaymentResponse;
import com.koishop.repository.OrdersRepository;
import com.koishop.repository.PaymentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    OrdersRepository ordersRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    UserService userService;

    public PaymentResponse getPaymentById(Integer id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Payment not found with id: " + id));

        return modelMapper.map(payment, PaymentResponse.class);
    }
    public List<PaymentResponse> getAllPayments() {
        List<Payment> paymentList = paymentRepository.findAll();
        List<PaymentResponse> paymentResponseList = new ArrayList<>();

        for (Payment payment : paymentList) {
            PaymentResponse response = modelMapper.map(payment, PaymentResponse.class);

            // Kiểm tra nếu Orders không null trước khi lấy orderId
            if (payment.getOrders() != null) {
                response.setOrderId(payment.getOrders().getOrderID());
            }

            paymentResponseList.add(response);
        }

        return paymentResponseList;
    }



    public PaymentResponse getPaymentByOrder(Integer orderId) {
        Payment payment = paymentRepository.findByOrders_OrderID(orderId);

        if (payment == null) {
            throw new EntityNotFoundException("Payment not found for Order ID: " + orderId);
        }

        // Kiểm tra xem đơn hàng liên kết có bị xóa không
        if (payment.getOrders() == null || payment.getOrders().isDeleted()) {
            throw new RuntimeException("Cannot retrieve payment. The order with ID " + orderId + " has been deleted.");
        }
        PaymentResponse response = modelMapper.map(payment, PaymentResponse.class);
        // Lấy orderId từ Orders và thiết lập cho PaymentResponse
        response.setOrderId(payment.getOrders() != null ? payment.getOrders().getOrderID() : null);

        return response; // Trả về PaymentResponse duy nhất
    }

    public List<PaymentResponse> getPaymentByUser() {
        User currentUser = userService.getCurrentUser();
        List<Orders> userOrders = ordersRepository.findOrdersByUser(currentUser);

        List<PaymentResponse> paymentResponseList = new ArrayList<>();

        // Lọc các thanh toán liên quan đến các đơn hàng của người dùng
        for (Orders order : userOrders) {
            Payment payment = paymentRepository.findByOrders(order);
            if (payment != null) {
                PaymentResponse response = modelMapper.map(payment, PaymentResponse.class);
                response.setOrderId(payment.getOrders().getOrderID()); // Ánh xạ orderId
                paymentResponseList.add(response);
            }
        }

        return paymentResponseList;
    }


    public void deletePayment(Integer id) {
        paymentRepository.deleteById(id);
    }


}

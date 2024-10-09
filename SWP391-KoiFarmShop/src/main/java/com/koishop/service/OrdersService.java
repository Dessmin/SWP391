package com.koishop.service;

import com.koishop.entity.*;
import com.koishop.exception.EntityNotFoundException;
import com.koishop.models.orderdetails_model.OrderDetailsRequest;
import com.koishop.models.orders_model.OrdersRequest;
import com.koishop.repository.KoiFishRepository;
import com.koishop.repository.OrderDetailsRepository;
import com.koishop.repository.OrdersRepository;
import com.koishop.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrdersService {
    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    UserService userService;

    @Autowired
    KoiFishRepository koiFishRepository;

    @Autowired
    PaymentRepository paymentRepository;

    @Autowired
    OrderDetailsRepository orderDetailsRepository;

    public List<Orders> getAllOrdersByUser() {
        User user = userService.getCurrentUser();
        List<Orders> orders = ordersRepository.findOrdersByUser(user);
        return orders;
    }



    // Create Order
    public Orders createOrder(OrdersRequest ordersRequest) {
        User user = userService.getCurrentUser();
        Orders order = new Orders();
        List<OrderDetails> orderDetails = new ArrayList<>();
        Payment payment = paymentRepository.findById(ordersRequest.getPaymentID())
                .orElseThrow(() -> new RuntimeException("Payment not found!"));
        float total = 0;
        order.setUser(user);
        order.setOrderDate(new Date());

        for (OrderDetailsRequest orderDetailsRequest:ordersRequest.getOrderDetails()) {
            KoiFish koiFish = koiFishRepository.findById(orderDetailsRequest.getKoiID())
                    .orElseThrow(() -> new RuntimeException("KoiFish not found!"));

            OrderDetails orderDetail = new OrderDetails();
            orderDetail.setQuantity(orderDetailsRequest.getQuantity());
            orderDetail.setUnitPrice(koiFish.getPrice());
            orderDetail.setOrders(order);
            orderDetail.setKoiFish(koiFish);

            orderDetails.add(orderDetail);

            total += koiFish.getPrice() * orderDetailsRequest.getQuantity();
        }
        order.setPayment(payment);
        order.setOrderStatus("Pending");
        order.setOrderDetails(orderDetails);
        order.setTotalAmount(total);
        return ordersRepository.save(order);
    }


    public Orders updateOrder(Integer orderId, OrdersRequest ordersRequest) {
        // Lấy thông tin đơn hàng hiện tại từ database
        User user = userService.getCurrentUser();
        Orders existingOrder = ordersRepository.findOrderByUserAndOrderID(user, orderId);
        if (existingOrder == null) throw new EntityNotFoundException("Order not found!");

        Payment payment = paymentRepository.findById(ordersRequest.getPaymentID())
                .orElseThrow(() -> new RuntimeException("Payment not found!"));

        float total = 0;

        // Cập nhật thông tin người dùng và ngày đặt hàng
        existingOrder.setOrderDate(new Date());

        // Duyệt qua danh sách OrderDetailsRequest mới để cập nhật
        for (OrderDetailsRequest orderDetailsRequest : ordersRequest.getOrderDetails()) {
            KoiFish koiFish = koiFishRepository.findById(orderDetailsRequest.getKoiID())
                    .orElseThrow(() -> new RuntimeException("KoiFish not found!"));

            // Kiểm tra xem OrderDetails đã tồn tại hay chưa dựa trên KoiID
            Optional<OrderDetails> existingOrderDetail = existingOrder.getOrderDetails().stream()
                    .filter(od -> od.getKoiFish().getKoiID().equals(koiFish.getKoiID()))
                    .findFirst();

            if (existingOrderDetail.isPresent()) {
                // Nếu OrderDetails đã tồn tại, cập nhật số lượng và giá
                OrderDetails orderDetail = existingOrderDetail.get();
                orderDetail.setQuantity(orderDetailsRequest.getQuantity());
                orderDetail.setUnitPrice(koiFish.getPrice());
            } else {
                // Nếu chưa tồn tại, tạo OrderDetails mới
                OrderDetails newOrderDetail = new OrderDetails();
                newOrderDetail.setKoiFish(koiFish);
                newOrderDetail.setQuantity(orderDetailsRequest.getQuantity());
                newOrderDetail.setUnitPrice(koiFish.getPrice());
                newOrderDetail.setOrders(existingOrder);  // Thiết lập quan hệ với Orders hiện tại
                existingOrder.getOrderDetails().add(newOrderDetail); // Thêm OrderDetail mới vào danh sách
            }

            // Tính toán lại tổng số tiền
            total += koiFish.getPrice() * orderDetailsRequest.getQuantity();
        }

        // Cập nhật thông tin thanh toán, trạng thái, và tổng số tiền
        existingOrder.setPayment(payment);
        existingOrder.setTotalAmount(total);

        // Lưu đơn hàng đã cập nhật
        return ordersRepository.save(existingOrder);
    }






    public void deleteOrder(int id) {
        Orders order = ordersRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));
        ordersRepository.delete(order);
    }
}

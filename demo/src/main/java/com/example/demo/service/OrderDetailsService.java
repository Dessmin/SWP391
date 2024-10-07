package com.example.demo.service;

import com.example.demo.entity.OrderDetails;
import com.example.demo.repository.OrderDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailsService {
    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    public List<OrderDetails> getAllOrderDetails() {
        return orderDetailsRepository.findAll();
    }


    public OrderDetails createOrderDetail(OrderDetails orderDetails) {
        return orderDetailsRepository.save(orderDetails);
    }

    public OrderDetails updateOrderDetail(int id, OrderDetails orderDetailsDetails) {
        OrderDetails orderDetails = orderDetailsRepository.findById(id).orElseThrow(() -> new RuntimeException("Order Detail not found"));
//        orderDetails.setOrderID(orderDetailsDetails.getOrderID());
//        orderDetails.setKoiID(orderDetailsDetails.getKoiID());
//        orderDetails.setQuantity(orderDetailsDetails.getQuantity());
//        orderDetails.setUnitPrice(orderDetailsDetails.getUnitPrice());
        return orderDetailsRepository.save(orderDetails);
    }

    public void deleteOrderDetail(int id) {
        orderDetailsRepository.deleteById(id);
    }
}

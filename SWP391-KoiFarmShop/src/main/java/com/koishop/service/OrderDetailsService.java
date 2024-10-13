package com.koishop.service;

import com.koishop.entity.OrderDetails;
import com.koishop.repository.OrderDetailsRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailsService {
    @Autowired
    private OrderDetailsRepository orderDetailsRepository;
    @Autowired
    private ModelMapper modelMap;

    public List<OrderDetails> getAllOrderDetails() {
        return orderDetailsRepository.findAll();
    }


    public OrderDetails createOrderDetail(OrderDetails orderDetails) {
        return orderDetailsRepository.save(orderDetails);
    }

    public OrderDetails updateOrderDetail(int id, OrderDetails orderDetailsDetails) {
        OrderDetails orderDetails = orderDetailsRepository.findById(id).orElseThrow(() -> new RuntimeException("Order Detail not found"));
        modelMap.map(orderDetailsDetails, orderDetails);
        return orderDetailsRepository.save(orderDetails);
    }

    public void deleteOrderDetail(int id) {
        orderDetailsRepository.deleteById(id);
    }
}

package com.koishop.service;

import com.koishop.entity.Orders;
import com.koishop.exception.EntityNotFoundException;
import com.koishop.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdersService {
    @Autowired
    private OrdersRepository ordersRepository;

    public List<Orders> getAllOrders() {
        return ordersRepository.findAll();
    }


    public Orders createOrder(Orders order) {
        return ordersRepository.save(order);
    }

    public Orders updateOrder(int id, Orders orderDetails) {
        Orders order = ordersRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));

//        order.setUserID(orderDetails.getUserID());
//        order.setOrderDate(orderDetails.getOrderDate());
//        order.setTotalAmount(orderDetails.getTotalAmount());
//        order.setOrderStatus(orderDetails.getOrderStatus());
//        order.setPaymentID(orderDetails.getPaymentID());

        return ordersRepository.save(order);
    }

    public void deleteOrder(int id) {
        Orders order = ordersRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));
        ordersRepository.delete(order);
    }
}

package com.koishop.repository;

import com.koishop.entity.Orders;
import com.koishop.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    Payment findByOrders(Orders orders);
    Payment findByOrders_OrderID(Integer id);
}

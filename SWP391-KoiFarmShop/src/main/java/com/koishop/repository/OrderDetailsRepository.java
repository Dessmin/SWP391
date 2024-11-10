package com.koishop.repository;

import com.koishop.entity.OrderDetails;
import com.koishop.entity.Orders;
import com.koishop.entity.User;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Integer> {
    List<OrderDetails> findByOrders_OrderID(Integer id);
}

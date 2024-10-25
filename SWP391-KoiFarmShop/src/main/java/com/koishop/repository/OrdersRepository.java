package com.koishop.repository;

import com.koishop.entity.Orders;
import com.koishop.entity.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {
    List<Orders> findOrdersByUser(User user);
    Orders findOrderByUserAndOrderID(User user, Integer OrderID);
    List<Orders> findByDeletedFalse();
    Orders findByOrderID(Integer OrderID);
    List<Orders> findByOrderStatusAndDeletedFalse(String orderStatus);
}

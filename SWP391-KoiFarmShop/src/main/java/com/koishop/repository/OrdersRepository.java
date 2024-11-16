package com.koishop.repository;

import com.koishop.entity.Orders;
import com.koishop.entity.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {
    List<Orders> findOrdersByUser(User user);
    List<Orders> findByDeletedFalse();
    Orders findByOrderID(Integer OrderID);
    @Query(value = "SELECT YEAR(order_date) AS year, DATE_FORMAT(order_date, '%Y-%m') AS month, SUM(total_amount) AS total_monthly_amount " +
            "FROM orders " +
            "WHERE order_status IN ('PAID', 'SUCCESSED')" +
            "AND order_date >= DATE_SUB(CURDATE(), INTERVAL 3 YEAR) " +
            "GROUP BY year, month " +
            "ORDER BY year, month", nativeQuery = true)
    List<Object[]> findIncomeLast3Years();
}

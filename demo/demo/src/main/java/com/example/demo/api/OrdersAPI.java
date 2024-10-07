package com.example.demo.api;

import com.example.demo.entity.Orders;
import com.example.demo.service.OrdersService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8080/")
@SecurityRequirement(name = "api")
@RestController
@RequestMapping("/api/orders")
public class OrdersAPI {
    @Autowired
    private OrdersService ordersService;

    @GetMapping("list-orders")
    public List<Orders> getAllOrders() {
        return ordersService.getAllOrders();
    }


    @PostMapping("add-order")
    public ResponseEntity<Orders> createOrder(@RequestBody Orders order) {
        Orders createdOrder = ordersService.createOrder(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
    }

    @PutMapping("/{orderID}")
    public ResponseEntity<Orders> updateOrder(@PathVariable int orderID, @RequestBody Orders orderDetails) {
        Orders updatedOrder = ordersService.updateOrder(orderID, orderDetails);
        return ResponseEntity.ok(updatedOrder);
    }

    @DeleteMapping("/{orderID}")
    public ResponseEntity<Void> deleteOrder(@PathVariable int orderID) {
        ordersService.deleteOrder(orderID);
        return ResponseEntity.noContent().build();
    }
}

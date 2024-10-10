package com.koishop.api;

import com.koishop.entity.Orders;
import com.koishop.models.orders_model.OrdersRequest;
import com.koishop.service.OrdersService;
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

    @GetMapping("list-order")
    public ResponseEntity getAllOrdersByUser() {
        List<Orders> orders = ordersService.getAllOrdersByUser();
        return ResponseEntity.ok(orders);
    }


    @PostMapping("add-order")
    public ResponseEntity createOrder(@RequestBody OrdersRequest ordersRequest) {
        Orders createdOrder = ordersService.createOrder(ordersRequest);
        return ResponseEntity.ok(createdOrder);
    }

    @PostMapping("add-to-cart")
    public ResponseEntity addToCart(@RequestBody OrdersRequest ordersRequest) {
        Orders cartItem = ordersService.addToCart(ordersRequest);
        return ResponseEntity.ok(cartItem);
    }

    @GetMapping("get-order-by-id/{orderId}")
    public ResponseEntity getOrderById(@PathVariable int orderId){
        Orders order = ordersService.getOrderById(orderId);
        return ResponseEntity.ok(order);
    }


    @PutMapping("/{orderID}/update")
    public ResponseEntity updateOrder(@PathVariable int orderID, @RequestBody OrdersRequest ordersRequest) {
        Orders updatedOrder = ordersService.updateOrder(orderID, ordersRequest);
        return ResponseEntity.ok(updatedOrder);
    }

    @DeleteMapping("/{orderID}/remove")
    public ResponseEntity<Void> deleteOrder(@PathVariable int orderID) {
        ordersService.deleteOrder(orderID);
        return ResponseEntity.noContent().build();
    }
}

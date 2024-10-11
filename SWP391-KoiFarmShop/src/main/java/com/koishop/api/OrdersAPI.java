package com.koishop.api;

import com.koishop.entity.Orders;
import com.koishop.models.orders_model.OrdersRequest;
import com.koishop.models.orders_model.OrdersResponse;
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

    @GetMapping("{OrderId}/get-order")
    public ResponseEntity getOrderById(Integer id) {
        OrdersResponse orders = ordersService.getOderById(id);
        return  ResponseEntity.ok(orders);
    }

    @GetMapping("list-all-orders")
    public ResponseEntity getAllOrders() {
        List<OrdersResponse> orders = ordersService.getAllOrders();
        return  ResponseEntity.ok(orders);
    }

    @GetMapping("list-user-orders")
    public ResponseEntity getAllOrdersByUser() {
        List<OrdersResponse> orders = ordersService.getAllOrdersByUser();
        return ResponseEntity.ok(orders);
    }


    @PostMapping("add-order")
    public ResponseEntity createOrder(@RequestBody OrdersRequest ordersRequest) {
        OrdersResponse createdOrder = ordersService.createOrder(ordersRequest);
        return ResponseEntity.ok(createdOrder);
    }

    @PutMapping("/{orderId}/update")
    public ResponseEntity updateOrder(@PathVariable int orderID, @RequestBody OrdersRequest ordersRequest) {
        OrdersResponse updatedOrder = ordersService.updateOrder(orderID, ordersRequest);
        return ResponseEntity.ok(updatedOrder);
    }

    @DeleteMapping("/{orderId}/remove")
    public ResponseEntity<Void> deleteOrder(@PathVariable int orderID) {
        ordersService.deleteOrder(orderID);
        return ResponseEntity.noContent().build();
    }
}

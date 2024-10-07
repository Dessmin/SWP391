package com.example.demo.api;

import com.example.demo.entity.OrderDetails;
import com.example.demo.service.OrderDetailsService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8080/")
@SecurityRequirement(name = "api")
@RestController
@RequestMapping("/api/order-details")
public class OrderDetailsAPI {
    @Autowired
    private OrderDetailsService orderDetailService;

    @GetMapping
    public List<OrderDetails> getAllOrderDetails() {
        return orderDetailService.getAllOrderDetails();
    }



    @PostMapping("create-orderdetail")
    public OrderDetails createOrderDetail(@RequestBody OrderDetails orderDetail) {
        return orderDetailService.createOrderDetail(orderDetail);
    }

    @PutMapping("/{orderDetailID}")
    public ResponseEntity<OrderDetails> updateOrderDetail(@PathVariable int orderDetailID, @RequestBody OrderDetails orderDetailDetails) {
        try {
            OrderDetails updatedOrderDetail = orderDetailService.updateOrderDetail(orderDetailID, orderDetailDetails);
            return ResponseEntity.ok(updatedOrderDetail);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{orderDetailID}")
    public ResponseEntity<Void> deleteOrderDetail(@PathVariable int orderDetailID) {
        orderDetailService.deleteOrderDetail(orderDetailID);
        return ResponseEntity.noContent().build();
    }
}

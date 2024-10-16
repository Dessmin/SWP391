package com.koishop.api;

import com.koishop.entity.Orders;
import com.koishop.models.orders_model.OrderRequest;
import com.koishop.models.orders_model.OrderResponse;
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

    @GetMapping("/{orderId}")
    public OrderResponse getOrderById(@PathVariable("orderId") Integer id) {
        return ordersService.getOderById(id);
    }

    @GetMapping("list-all-orders")
    public ResponseEntity getAllOrders() {
        List<OrderResponse> orders = ordersService.getAllOrders();
        return  ResponseEntity.ok(orders);
    }

    @GetMapping("list-user-orders")
    public ResponseEntity getAllOrdersByUser() {
        List<OrderResponse> orders = ordersService.getAllOrdersByUser();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/Income")
    public List<Integer> getIncomePerMonth() {
        return ordersService.IncomePerMonth();
    }

    @PostMapping("transaction")
    public ResponseEntity creater(@RequestParam Integer id) throws Exception {
        ordersService.createTransactions(id);
        return ResponseEntity.ok("Success");
    }

    @PostMapping("add-order")
    public ResponseEntity createOrder(@RequestBody OrderRequest orderRequest) throws Exception {
        String vnPayURL = ordersService.createUrl(orderRequest);
        return ResponseEntity.ok(vnPayURL);
    }

    @PutMapping("/{orderID}/update")
    public ResponseEntity updateOrder(@PathVariable int orderID, @RequestBody OrderRequest orderRequest) {
        Orders updatedOrder = ordersService.updateOrder(orderID, orderRequest);
        return ResponseEntity.ok(updatedOrder);
    }

    @DeleteMapping("/{orderID}/remove")
    public ResponseEntity<Void> deleteOrder(@PathVariable int orderID) {
        ordersService.deleteOrder(orderID);
        return ResponseEntity.noContent().build();
    }
}

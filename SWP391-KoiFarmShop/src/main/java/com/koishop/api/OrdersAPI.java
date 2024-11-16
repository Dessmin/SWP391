package com.koishop.api;

import com.koishop.entity.Orders;
import com.koishop.models.orders_model.OrderRequest;
import com.koishop.models.orders_model.OrderResponse;
import com.koishop.models.orders_model.ViewOrdersOnly;
import com.koishop.service.OrdersService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = {"http://localhost:5173", "https://deploy-fe-kappa.vercel.app"})
@SecurityRequirement(name = "api")
@RestController
@RequestMapping("/api/orders")
public class OrdersAPI {
    @Autowired
    private OrdersService ordersService;

    @GetMapping("/{orderId}")
    public ResponseEntity<Orders> getOrderById(@PathVariable("orderId") Integer id) {
        Orders order = ordersService.getOderById(id);
        if (order == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(order);
    }

    @GetMapping("list-all-orders")
    @PreAuthorize("hasAuthority('Manager') or hasAuthority('Staff')")
    public ResponseEntity getAllOrders() {
        List<OrderResponse> orders = ordersService.getAllOrders();
        return  ResponseEntity.ok(orders);
    }

    @GetMapping("/list-user-orders/summary")
    public ResponseEntity getOrdersSummaryByUser() {
        List<ViewOrdersOnly> orders = ordersService.getOrdersSummaryByUser();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/list-orders/summary")
    @PreAuthorize("hasAuthority('Manager') or hasAuthority('Staff')")
    public ResponseEntity getOrdersSummary() {
        List<ViewOrdersOnly> orders = ordersService.getOrdersSummary();
        return  ResponseEntity.ok(orders);
    }

    @GetMapping("list-user-orders")
    public ResponseEntity getAllOrdersByUser() {
        List<OrderResponse> orders = ordersService.getAllOrdersByUser();
        return ResponseEntity.ok(orders);
    }


    @PostMapping("{orderId}/transaction")
    public ResponseEntity creater(@PathVariable Integer orderId) throws Exception {
        ordersService.createTransactions(orderId);
        return ResponseEntity.ok("Success");
    }


    @PostMapping("add-order")
    public ResponseEntity createOrder(@Valid @RequestBody OrderRequest orderRequest) throws Exception {
        String vnPayURL = ordersService.createUrl(orderRequest);
        return ResponseEntity.ok(vnPayURL);
    }


    @PutMapping("/{orderId}/update-status")
    public ResponseEntity<String> updateStatus(@PathVariable Integer orderId, @RequestParam String status) {
        ordersService.updateStatus(orderId, status);
        return ResponseEntity.ok().body("Order status updated successfully.");
    }

    @PutMapping("/{orderId}/update-delivery-status")
    public ResponseEntity<String> updateDeliveryStatus(@PathVariable Integer orderId, @RequestParam String status) {
        ordersService.updateDeliveryStatus(orderId, status);
        return ResponseEntity.ok().body("Order delivery status updated successfully.");
    }

    @PutMapping("/{orderID}/remove")
    @PreAuthorize("hasAuthority('Manager')")
    public ResponseEntity<Void> deleteOrder(@PathVariable int orderID) {
        ordersService.deleteOrder(orderID);
        return ResponseEntity.noContent().build();
    }
}

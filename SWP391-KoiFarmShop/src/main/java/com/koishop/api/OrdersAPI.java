package com.koishop.api;

import com.koishop.entity.Orders;
import com.koishop.models.orders_model.OrderRequest;
import com.koishop.models.orders_model.OrderResponse;
import com.koishop.models.orders_model.ViewOrdersOnly;
import com.koishop.service.OrdersService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173/")
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

    @GetMapping("/vnpay-return")
    public ResponseEntity<String> handleVnpayReturn(@RequestParam Map<String, String> params) throws Exception {
        String responseCode = params.get("vnp_ResponseCode");
        String txnRef = params.get("vnp_TxnRef");

        try {
            if ("00".equals(responseCode)) {
                ordersService.updateOrderStatus(txnRef, "PAID");
                return ResponseEntity.ok("Payment successful");
            } else {
                ordersService.updateOrderStatus(txnRef, "FAILED");
                return ResponseEntity.status(400).body("Payment failed: Response Code " + responseCode);
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating order status: " + e.getMessage());
        }
    }

    @PostMapping("add-order")
    public ResponseEntity createOrder(@RequestBody OrderRequest orderRequest) throws Exception {
        String vnPayURL = ordersService.createUrl(orderRequest);
        return ResponseEntity.ok(vnPayURL);
    }

//    @PutMapping("/{orderID}/update")
//    public ResponseEntity updateOrder(@PathVariable int orderID, @RequestBody OrderRequest orderRequest) {
//        OrderResponse updatedOrder = ordersService.updateOrder(orderID, orderRequest);
//        return ResponseEntity.ok(updatedOrder);
//    }


    @PutMapping("/{orderId}/update-status")
    public ResponseEntity<String> updateStatus(@PathVariable Integer orderId, @RequestParam String status) {
        ordersService.updateStatus(orderId, status);
        return ResponseEntity.ok().body("Order status updated successfully.");
    }

    @PutMapping("/{orderId}/update-order-status")
    public ResponseEntity<ViewOrdersOnly> updateOrderStatus(@PathVariable Integer orderId, @RequestParam String status) {
        ViewOrdersOnly updatedOrder = ordersService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok(updatedOrder);
    }




    @PutMapping("/{orderID}/remove")
    public ResponseEntity<Void> deleteOrder(@PathVariable int orderID) {
        ordersService.deleteOrder(orderID);
        return ResponseEntity.noContent().build();
    }
}

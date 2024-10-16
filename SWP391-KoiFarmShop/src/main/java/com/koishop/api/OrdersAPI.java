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
import java.util.Map;

@CrossOrigin(origins = "http://localhost:8080/")
@SecurityRequirement(name = "api")
@RestController
@RequestMapping("/api/orders")
public class OrdersAPI {
    @Autowired
    private OrdersService ordersService;

    @GetMapping("{id}/get-order")
    public ResponseEntity getOrderById(@PathVariable Integer id) {
        Orders orders = ordersService.getOrderById(id);
        return  ResponseEntity.ok(orders);
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

    @GetMapping("/vnpay-return")
    public ResponseEntity<String> handleVnpayReturn(@RequestParam Map<String, String> params) throws Exception {
        String responseCode = params.get("vnp_ResponseCode");
        String txnRef = params.get("vnp_TxnRef");

        // Kiểm tra mã phản hồi từ VNPay
        if ("00".equals(responseCode)) {
            // Nếu thanh toán thành công, cập nhật trạng thái đơn hàng
            ordersService.updateOrderStatus(txnRef, "PAID");
            return ResponseEntity.ok("Thanh toán thành công");
        } else {
            // Nếu thanh toán thất bại, cập nhật trạng thái đơn hàng
            ordersService.updateOrderStatus(txnRef, "FAILED");
            return ResponseEntity.ok("Thanh toán thất bại");
        }
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

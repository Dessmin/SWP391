package com.koishop.api;

import com.koishop.entity.OrderDetails;
import com.koishop.models.orderdetails_model.OrderDetailsRequest;
import com.koishop.models.orderdetails_model.OrderDetailsResponse;
import com.koishop.service.OrderDetailsService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@SecurityRequirement(name = "api")
@RestController
@RequestMapping("/api/order-details")
public class OrderDetailsAPI {
    @Autowired
    private OrderDetailsService orderDetailService;



    @GetMapping("/{orderDetailId}/get-orderDetail")
    public ResponseEntity getOrderDetailsById(@PathVariable Integer orderDetailId) {
        OrderDetailsResponse response = orderDetailService.getOrderDetailsById(orderDetailId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/list-all-orderDetails")
    public ResponseEntity getAllOrderDetails() {
        List<OrderDetailsResponse> response = orderDetailService.getAllOrderDetails();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{orderId}/list-order-orderDetails")
    public ResponseEntity getOrderDetailsByOrder(@PathVariable Integer orderId) {
        List<OrderDetailsResponse> response = orderDetailService.getOrderDetailsByOrder(orderId);
        return ResponseEntity.ok(response);
    }



//    @PutMapping("/{orderId}/add-details")
//    public ResponseEntity<List<OrderDetailsResponse>> addOrderDetails(@PathVariable Integer orderId, @RequestBody List<OrderDetailsRequest> orderDetailsRequests) {
//        List<OrderDetailsResponse> addedOrderDetails = orderDetailService.addOrderDetails(orderId, orderDetailsRequests);
//        return ResponseEntity.ok(addedOrderDetails);
//    }

    @PutMapping("/{orderDetailID}")
    public ResponseEntity<OrderDetailsResponse> updateOrderDetail(@PathVariable int orderDetailID, @RequestBody OrderDetailsRequest orderDetailsRequest) {
        try {
            OrderDetailsResponse updatedOrderDetail = orderDetailService.updateOrderDetail(orderDetailID, orderDetailsRequest);
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

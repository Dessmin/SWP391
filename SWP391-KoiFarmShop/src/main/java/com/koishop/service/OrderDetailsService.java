package com.koishop.service;

import com.koishop.entity.*;
import com.koishop.exception.EntityNotFoundException;
import com.koishop.models.orderdetails_model.OrderDetailsRequest;
import com.koishop.models.orderdetails_model.OrderDetailsResponse;
import com.koishop.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrderDetailsService {
    @Autowired
    private OrderDetailsRepository orderDetailsRepository;
    @Autowired
    private ModelMapper modelMapper;

    public OrderDetailsResponse getOrderDetailsById(Integer id) {
        OrderDetails orderDetail = orderDetailsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("OrderDetails not found!"));
        return modelMapper.map(orderDetail, OrderDetailsResponse.class);
    }

    public List<OrderDetailsResponse> getAllOrderDetails() {
        List<OrderDetails> orderDetailsList = orderDetailsRepository.findAll();
        List<OrderDetailsResponse> orderDetailsResponseList = new ArrayList<>();

        // Ánh xạ từ OrderDetails sang OrderDetailsResponse bằng vòng lặp for
        for (OrderDetails orderDetails : orderDetailsList) {
            if (orderDetails.getOrders().isDeleted()) {
                throw new RuntimeException("Order with ID " + orderDetails.getOrders().getOrderID() + " has been deleted!");
            }
            OrderDetailsResponse response = modelMapper.map(orderDetails, OrderDetailsResponse.class);
            response.setOrderId(orderDetails.getOrders().getOrderID());
            orderDetailsResponseList.add(response);
        }

        return orderDetailsResponseList;
    }


    public List<OrderDetailsResponse> getOrderDetailsByOrder(Integer orderId) {
        // Lấy danh sách OrderDetails theo orderId
        List<OrderDetails> orderDetailsList = orderDetailsRepository.findByOrders_OrderID(orderId);
        if (orderDetailsList.isEmpty()) {
            throw new EntityNotFoundException("No OrderDetails found for Order ID: " + orderId);
        }
        if (orderDetailsList.get(0).getOrders().isDeleted()) {
            throw new RuntimeException("Order with ID " + orderId + " has been deleted!");
        }
        List<OrderDetailsResponse> orderDetailsResponses = new ArrayList<>();

        // Ánh xạ từ OrderDetails sang OrderDetailsResponse
        for (OrderDetails orderDetails : orderDetailsList) {
            OrderDetailsResponse response = modelMapper.map(orderDetails, OrderDetailsResponse.class);

            // Nếu cần, có thể thiết lập thêm thông tin khác từ OrderDetails
            if (orderDetails.getOrders() != null) {
                response.setOrderId(orderDetails.getOrders().getOrderID());
            }

            orderDetailsResponses.add(response);
        }

        return orderDetailsResponses;
    }

    public OrderDetailsResponse updateOrderDetail(int id, OrderDetailsRequest orderDetailsRequest) {
        // Tìm OrderDetails theo id, nếu không tồn tại thì ném lỗi
        OrderDetails orderDetails = orderDetailsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order Detail not found"));

        if (orderDetails.getOrders().isDeleted()) {
            throw new RuntimeException("Cannot update Order Detail. The order with ID "
                    + orderDetails.getOrders().getOrderID() + " has been deleted.");
        }

        // Ánh xạ từ OrderDetailsRequest vào thực thể orderDetails hiện tại
        modelMapper.map(orderDetailsRequest, orderDetails);

        // Lưu lại thay đổi
        orderDetailsRepository.save(orderDetails);

        // Tạo OrderDetailsResponse để trả về
        OrderDetailsResponse orderDetailsResponse = modelMapper.map(orderDetails, OrderDetailsResponse.class);

        // Cập nhật orderId từ đơn hàng
        if (orderDetails.getOrders() != null) {
            orderDetailsResponse.setOrderId(orderDetails.getOrders().getOrderID());
        }
        return orderDetailsResponse;
    }


    public void deleteOrderDetail(Integer id) {
        orderDetailsRepository.deleteById(id);
    }
}

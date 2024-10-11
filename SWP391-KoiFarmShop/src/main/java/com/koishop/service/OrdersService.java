package com.koishop.service;

import com.koishop.entity.*;
import com.koishop.exception.EntityNotFoundException;
import com.koishop.models.fish_model.ViewFish;
import com.koishop.models.orderdetails_model.OrderDetailResponse;
import com.koishop.models.orderdetails_model.OrderDetailsRequest;
import com.koishop.models.orders_model.OrdersRequest;
import com.koishop.models.orders_model.OrdersResponse;
import com.koishop.repository.KoiFishRepository;
import com.koishop.repository.OrderDetailsRepository;
import com.koishop.repository.OrdersRepository;
import com.koishop.repository.PaymentRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrdersService {
    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    UserService userService;

    @Autowired
    KoiFishRepository koiFishRepository;

    @Autowired
    PaymentRepository paymentRepository;

    @Autowired
    OrderDetailsRepository orderDetailsRepository;

    @Autowired
    ModelMapper modelMapper;

    public OrdersResponse getOderById(Integer id) {
        Orders order = ordersRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found for this id :: " + id));
        return modelMapper.map(order, OrdersResponse.class);
    }

    public List<OrdersResponse> getAllOrders() {
        return ordersRepository.findAll().stream()
                .map(order -> {
                    OrdersResponse orderResponse = modelMapper.map(order, OrdersResponse.class);

                    // Ánh xạ và thiết lập ViewFish trong cùng một bước
                    orderResponse.setOrderDetails(order.getOrderDetails().stream()
                            .map(orderDetail -> {
                                OrderDetailResponse orderDetailResponse = modelMapper.map(orderDetail, OrderDetailResponse.class);
                                // Thiết lập ViewFish
                                orderDetailResponse.setViewFish(modelMapper.map(orderDetail.getKoiFish(), ViewFish.class));
                                return orderDetailResponse;
                            })
                            .collect(Collectors.toList()));

                    return orderResponse;
                })
                .collect(Collectors.toList());
    }

    public List<OrdersResponse> getAllOrdersByUser() {
        User user = userService.getCurrentUser();
        return ordersRepository.findOrdersByUser(user).stream()
                .map(order -> {
                    // Ánh xạ từ Orders sang OrdersResponse
                    OrdersResponse orderResponse = modelMapper.map(order, OrdersResponse.class);

                    // Ánh xạ từ OrderDetails sang OrderDetailResponse và thiết lập ViewFish
                    orderResponse.setOrderDetails(order.getOrderDetails().stream()
                            .map(orderDetail -> {
                                OrderDetailResponse orderDetailResponse = modelMapper.map(orderDetail, OrderDetailResponse.class);
                                // Thiết lập ViewFish
                                orderDetailResponse.setViewFish(modelMapper.map(orderDetail.getKoiFish(), ViewFish.class));
                                return orderDetailResponse;
                            })
                            .collect(Collectors.toList()));

                    return orderResponse;
                })
                .collect(Collectors.toList());
    }




    public OrdersResponse createOrder(OrdersRequest ordersRequest) {
        User user = userService.getCurrentUser();
        Orders order = new Orders();
        List<OrderDetails> orderDetails = new ArrayList<>();
        float total = 0;

        order.setUser(user);
        order.setOrderDate(new Date());

        for (OrderDetailsRequest orderDetailsRequest : ordersRequest.getOrderDetails()) {
            KoiFish koiFish = koiFishRepository.findById(orderDetailsRequest.getKoiID())
                    .orElseThrow(() -> new RuntimeException("KoiFish not found!"));

            OrderDetails orderDetail = new OrderDetails();
            orderDetail.setQuantity(orderDetailsRequest.getQuantity());
            orderDetail.setUnitPrice(koiFish.getPrice());
            orderDetail.setOrders(order);
            orderDetail.setKoiFish(koiFish);

            orderDetails.add(orderDetail);
            total += koiFish.getPrice() * orderDetailsRequest.getQuantity();
        }



        order.setOrderStatus("Pending");
        order.setOrderDetails(orderDetails);
        order.setTotalAmount(total);

        Orders savedOrder = ordersRepository.save(order);

        // Tạo danh sách OrderDetailResponse với ViewFish
        List<OrderDetailResponse> orderDetailResponses = savedOrder.getOrderDetails().stream()
                .map(orderDetail -> {
                    OrderDetailResponse response = modelMapper.map(orderDetail, OrderDetailResponse.class);
                    // Thiết lập ViewFish cho OrderDetailResponse
                    response.setViewFish(modelMapper.map(orderDetail.getKoiFish(), ViewFish.class));
                    return response;
                })
                .collect(Collectors.toList());

        OrdersResponse ordersResponse = modelMapper.map(savedOrder, OrdersResponse.class);
        ordersResponse.setOrderDetails(orderDetailResponses);

        return ordersResponse;
    }

    public OrdersResponse updateOrder(Integer orderId, OrdersRequest ordersRequest) {
        // Lấy thông tin đơn hàng hiện tại từ database
        User user = userService.getCurrentUser();
        Orders existingOrder = ordersRepository.findOrderByUserAndOrderID(user, orderId);
        if (existingOrder == null) throw new EntityNotFoundException("Order not found!");


        float total = 0;

        // Cập nhật thông tin người dùng và ngày đặt hàng
        existingOrder.setOrderDate(new Date());

        // Duyệt qua danh sách OrderDetailsRequest mới để cập nhật
        for (OrderDetailsRequest orderDetailsRequest : ordersRequest.getOrderDetails()) {
            KoiFish koiFish = koiFishRepository.findById(orderDetailsRequest.getKoiID())
                    .orElseThrow(() -> new RuntimeException("KoiFish not found!"));

            // Kiểm tra xem OrderDetails đã tồn tại hay chưa dựa trên KoiID
            Optional<OrderDetails> existingOrderDetail = existingOrder.getOrderDetails().stream()
                    .filter(od -> od.getKoiFish().getKoiID().equals(koiFish.getKoiID()))
                    .findFirst();

            if (existingOrderDetail.isPresent()) {
                // Nếu OrderDetails đã tồn tại, cập nhật số lượng và giá
                OrderDetails orderDetail = existingOrderDetail.get();
                orderDetail.setQuantity(orderDetailsRequest.getQuantity());
                orderDetail.setUnitPrice(koiFish.getPrice());
            } else {
                // Nếu chưa tồn tại, tạo OrderDetails mới
                OrderDetails newOrderDetail = new OrderDetails();
                newOrderDetail.setKoiFish(koiFish);
                newOrderDetail.setQuantity(orderDetailsRequest.getQuantity());
                newOrderDetail.setUnitPrice(koiFish.getPrice());
                newOrderDetail.setOrders(existingOrder);  // Thiết lập quan hệ với Orders hiện tại
                existingOrder.getOrderDetails().add(newOrderDetail); // Thêm OrderDetail mới vào danh sách
            }

            // Tính toán lại tổng số tiền
            total += koiFish.getPrice() * orderDetailsRequest.getQuantity();
        }

        // Cập nhật thông tin thanh toán, trạng thái, và tổng số tiền
        existingOrder.setTotalAmount(total);

        // Lưu đơn hàng đã cập nhật
        Orders savedOrder = ordersRepository.save(existingOrder);

        // Chuyển đổi từ Orders sang OrdersResponse
        OrdersResponse ordersResponse = modelMapper.map(savedOrder, OrdersResponse.class);

        // Chuyển đổi các OrderDetails sang OrderDetailResponse
        List<OrderDetailResponse> orderDetailResponses = savedOrder.getOrderDetails().stream()
                .map(orderDetail -> {
                    OrderDetailResponse orderDetailResponse = modelMapper.map(orderDetail, OrderDetailResponse.class);
                    orderDetailResponse.setViewFish(modelMapper.map(orderDetail.getKoiFish(), ViewFish.class));
                    return orderDetailResponse;
                })
                .collect(Collectors.toList());

        // Thiết lập danh sách OrderDetailResponse cho OrdersResponse
        ordersResponse.setOrderDetails(orderDetailResponses);

        return ordersResponse;
    }






    public void deleteOrder(int id) {
        Orders order = ordersRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));
        ordersRepository.delete(order);
    }

}

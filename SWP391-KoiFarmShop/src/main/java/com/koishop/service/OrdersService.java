package com.koishop.service;

import com.koishop.entity.*;
import com.koishop.exception.EntityNotFoundException;
import com.koishop.models.orderdetails_model.OrderDetailsRequest;
import com.koishop.models.orders_model.OrderRequest;
import com.koishop.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrdersService {
    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    UserService userService;

    @Autowired
    KoiFishRepository koiFishRepository;
    @Autowired
    BatchRepository batchRepository;
    @Autowired
    ModelMapper modelMapper;


    public Orders getOderById(Integer id) {
        Orders order = ordersRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found!"));
        return order;
    }

    public List<Orders> getAllOrders() {
        return ordersRepository.findAll();


    }

    public List<Orders> getAllOrdersByUser() {
        User user = userService.getCurrentUser();
        return ordersRepository.findOrdersByUser(user);


    }



    // Create Order
    public Orders createOrder(OrderRequest orderRequest) {
        User user = userService.getCurrentUser();
        Orders order = new Orders();
        List<OrderDetails> orderDetails = new ArrayList<>();
        double total = 0;
        order.setUser(user);
        order.setOrderDate(new Date());
        for (OrderDetailsRequest orderDetailsRequest: orderRequest.getOrderDetails()) {
            OrderDetails orderDetail = new OrderDetails();
            orderDetail.setOrders(order);
            orderDetail.setProductId(orderDetailsRequest.getProductId());
            orderDetail.setProductType(orderDetailsRequest.getProductType());
            orderDetail.setQuantity(orderDetailsRequest.getQuantity());
            orderDetail.setUnitPrice(orderDetailsRequest.getPrice());
            total += orderDetailsRequest.getQuantity() * orderDetailsRequest.getPrice();
            orderDetails.add(orderDetail);
        }
        order.setOrderDetails(orderDetails);
        order.setTotalAmount(total);
        order.setOrderStatus("Pending");
        return ordersRepository.save(order);
    }

    public Orders updateOrder(Integer orderId, OrderRequest orderRequest) {
        // Lấy thông tin đơn hàng hiện tại từ database
        User user = userService.getCurrentUser();
        Orders existingOrder = ordersRepository.findOrderByUserAndOrderID(user, orderId);
        if (existingOrder == null) throw new EntityNotFoundException("Order not found!");

        double total = 0;

        // Cập nhật thông tin ngày đặt hàng
        existingOrder.setOrderDate(new Date());

        // Duyệt qua danh sách OrderDetailsRequest mới để cập nhật
        for (OrderDetailsRequest orderDetailsRequest : orderRequest.getOrderDetails()) {
            if (orderDetailsRequest.getProductType() == ProductType.KoiFish) {
                KoiFish koiFish = koiFishRepository.findById(orderDetailsRequest.getProductId())
                        .orElseThrow(() -> new RuntimeException("KoiFish not found!"));

                // Kiểm tra xem OrderDetails đã tồn tại hay chưa
                Optional<OrderDetails> existingOrderDetail = existingOrder.getOrderDetails().stream()
                        .filter(od -> od.getProductId().equals(koiFish.getKoiID()) && od.getProductType() == ProductType.KoiFish)
                        .findFirst();

                if (existingOrderDetail.isPresent()) {
                    // Cập nhật giá nếu đã tồn tại
                    OrderDetails orderDetail = existingOrderDetail.get();
                    orderDetail.setUnitPrice(koiFish.getPrice());
                } else {
                    // Tạo OrderDetails mới
                    OrderDetails newOrderDetail = new OrderDetails();
                    newOrderDetail.setProductId(koiFish.getKoiID());
                    newOrderDetail.setProductType(ProductType.KoiFish);
                    newOrderDetail.setQuantity(1); // KoiFish luôn có số lượng 1
                    newOrderDetail.setUnitPrice(koiFish.getPrice());
                    newOrderDetail.setOrders(existingOrder);
                    existingOrder.getOrderDetails().add(newOrderDetail);
                }
                total += koiFish.getPrice();
            } else if (orderDetailsRequest.getProductType() == ProductType.Batch) {
                Batch batch = batchRepository.findById(orderDetailsRequest.getProductId())
                        .orElseThrow(() -> new RuntimeException("Batch not found!"));

                // Kiểm tra OrderDetails cho Batch
                Optional<OrderDetails> existingOrderDetail = existingOrder.getOrderDetails().stream()
                        .filter(od -> od.getProductId().equals(batch.getBatchID()) && od.getProductType() == ProductType.Batch)
                        .findFirst();

                if (existingOrderDetail.isPresent()) {
                    // Cập nhật số lượng và giá nếu đã tồn tại
                    OrderDetails orderDetail = existingOrderDetail.get();
                    orderDetail.setQuantity(orderDetailsRequest.getQuantity());
                    orderDetail.setUnitPrice(batch.getPrice());
                } else {
                    // Tạo OrderDetails mới cho Batch
                    OrderDetails newOrderDetail = new OrderDetails();
                    newOrderDetail.setProductId(batch.getBatchID());
                    newOrderDetail.setProductType(ProductType.Batch);
                    newOrderDetail.setQuantity(orderDetailsRequest.getQuantity());
                    newOrderDetail.setUnitPrice(batch.getPrice());
                    newOrderDetail.setOrders(existingOrder);
                    existingOrder.getOrderDetails().add(newOrderDetail);
                }
                total += batch.getPrice() * orderDetailsRequest.getQuantity();
            }
        }

        // Cập nhật tổng số tiền của đơn hàng
        existingOrder.setTotalAmount(total);

        // Lưu đơn hàng đã cập nhật
        return ordersRepository.save(existingOrder);
    }

    public void deleteOrder(int id) {
        Orders order = ordersRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));
        ordersRepository.delete(order);
    }
}

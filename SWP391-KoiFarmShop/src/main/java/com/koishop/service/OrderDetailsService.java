package com.koishop.service;

import com.koishop.entity.*;
import com.koishop.exception.EntityNotFoundException;
import com.koishop.models.orderdetails_model.OrderDetailsRequest;
import com.koishop.models.orderdetails_model.OrderDetailsResponse;
import com.koishop.repository.BatchRepository;
import com.koishop.repository.KoiFishRepository;
import com.koishop.repository.OrderDetailsRepository;
import com.koishop.repository.OrdersRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderDetailsService {
    @Autowired
    private OrderDetailsRepository orderDetailsRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    UserService userService;
    @Autowired
    OrdersRepository ordersRepository;
    @Autowired
    KoiFishService koiFishService;
    @Autowired
    BatchService batchService;
    @Autowired
    KoiFishRepository koiFishRepository;
    @Autowired
    BatchRepository batchRepository;


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



    public List<OrderDetailsResponse> addOrderDetails(Integer orderId, List<OrderDetailsRequest> orderDetailsRequests) {
        // Lấy thông tin đơn hàng hiện tại từ database
        User user = userService.getCurrentUser();
        Orders existingOrder = ordersRepository.findOrderByUserAndOrderID(user, orderId);
        if (existingOrder == null) throw new EntityNotFoundException("Order not found!");

        double total = existingOrder.getTotalAmount(); // Lấy tổng số tiền hiện tại của đơn hàng
        List<OrderDetailsResponse> addedOrderDetailsResponses = new ArrayList<>();

        // Duyệt qua danh sách OrderDetailsRequest để thêm vào đơn hàng hiện có
        for (OrderDetailsRequest orderDetailsRequest : orderDetailsRequests) {
            // Sử dụng ModelMapper để chuyển đổi từ OrderDetailsRequest sang OrderDetails
            OrderDetails newOrderDetail = modelMapper.map(orderDetailsRequest, OrderDetails.class);
            newOrderDetail.setOrders(existingOrder); // Liên kết với đơn hàng hiện có

            double unitPrice;
            // Kiểm tra và cập nhật trạng thái sản phẩm (KoiFish hoặc Batch) và lấy giá
            if (orderDetailsRequest.getProductType() == ProductType.KoiFish) {
                KoiFish koiFish = koiFishRepository.findById(orderDetailsRequest.getProductId())
                        .orElseThrow(() -> new EntityNotFoundException("KoiFish not found"));// Lấy KoiFish
                unitPrice = koiFish.getPrice(); // Lấy giá của KoiFish
                koiFishService.updateIsForSale(orderDetailsRequest.getProductId());
            } else if (orderDetailsRequest.getProductType() == ProductType.Batch) {
                Batch batch = batchRepository.findById(orderDetailsRequest.getProductId())
                        .orElseThrow(() -> new EntityNotFoundException("Batch not found"));// Lấy Batch
                unitPrice = batch.getPrice(); // Lấy giá của Batch
                batchService.updateIsSale(orderDetailsRequest.getProductId());
            } else {
                throw new IllegalArgumentException("Unknown product type");
            }

            // Cập nhật đơn giá cho OrderDetails
            newOrderDetail.setUnitPrice(unitPrice);

            // Cập nhật lại tổng số tiền
            total += orderDetailsRequest.getQuantity() * unitPrice;

            // Thêm mới chi tiết đơn hàng vào danh sách
            existingOrder.getOrderDetails().add(newOrderDetail);

            // Sử dụng ModelMapper để chuyển đổi từ OrderDetails sang OrderDetailsResponse
            OrderDetailsResponse orderDetailsResponse = modelMapper.map(newOrderDetail, OrderDetailsResponse.class);
            orderDetailsResponse.setOrderId(existingOrder.getOrderID()); // Thiết lập ID của đơn hàng

            // Thêm vào danh sách phản hồi
            addedOrderDetailsResponses.add(orderDetailsResponse);
        }

        // Cập nhật tổng số tiền cho đơn hàng
        existingOrder.setTotalAmount(total);

        // Lưu đơn hàng đã cập nhật
        ordersRepository.save(existingOrder);

        return addedOrderDetailsResponses; // Trả về danh sách OrderDetailsResponse
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

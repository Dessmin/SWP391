package com.koishop.service;

import com.koishop.Config.EnvironmentConfig;
import com.koishop.entity.*;
import com.koishop.exception.EntityNotFoundException;
import com.koishop.models.orderdetails_model.OrderDetailsRequest;
import com.koishop.models.orders_model.OrderRequest;
import com.koishop.models.orders_model.OrderResponse;
import com.koishop.models.orders_model.ViewOrdersOnly;
import com.koishop.models.user_model.EmailDetail;
import com.koishop.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class OrdersService {
    @Autowired
    private OrdersRepository ordersRepository;
    @Autowired
    UserService userService;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PaymentRepository paymentRepository;
    @Autowired
    BatchService batchService;
    @Autowired
    EmailService emailService;
    @Autowired
    private KoiFishRepository koiFishRepository;
    @Autowired
    private OrderDetailsRepository orderDetailsRepository;
    @Autowired
    private ConsignmentRequestRepository consignmentRequestRepository;
    @Autowired
    EnvironmentConfig environmentConfig;


    public Orders getOderById(Integer id) {
        return ordersRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found!"));
    }

    public List<OrderResponse> getAllOrders() {
        List<OrderResponse> orderResponses = new ArrayList<>();
        for (Orders order : ordersRepository.findByDeletedFalse()) {
            OrderResponse orderResponse = modelMapper.map(order, OrderResponse.class);
            orderResponse.setUserName(order.getUser().getUsername());

            orderResponses.add(orderResponse);
        }
        return orderResponses;
    }

    public List<OrderResponse> getAllOrdersByUser() {
        User user = userService.getCurrentUser();
        List<OrderResponse> orderResponses = new ArrayList<>();
        for (Orders order : ordersRepository.findByDeletedFalse()) {
            if (order.getUser().getUsername().equals(user.getUsername())) {
                OrderResponse orderResponse = modelMapper.map(order, OrderResponse.class);
                orderResponse.setUserName(order.getUser().getUsername());

                orderResponses.add(orderResponse);
            }
        }
        return orderResponses;
    }

    public List<ViewOrdersOnly> getOrdersSummary() {
        List<Orders> ordersList = ordersRepository.findByDeletedFalse();
        List<ViewOrdersOnly> viewOrdersOnlyList = new ArrayList<>();

        for (Orders order : ordersList) {
            ViewOrdersOnly ordersOnly = modelMapper.map(order, ViewOrdersOnly.class);

            // Kiểm tra nếu User là null, vứt ra ngoại lệ
            if (order.getUser() == null) {
                throw new RuntimeException("User not found for Order ID: " + order.getOrderID());
            }

            ordersOnly.setUserName(order.getUser().getUsername());

            viewOrdersOnlyList.add(ordersOnly);
        }

        return viewOrdersOnlyList;
    }


    public List<ViewOrdersOnly> getOrdersSummaryByUser() {
        User currentUser = userService.getCurrentUser();

        // Danh sách để chứa các ViewOrdersOnly DTO
        List<ViewOrdersOnly> viewOrdersOnlyList = new ArrayList<>();

        // Lấy danh sách tất cả các đơn hàng và lọc theo user hiện tại
        for (Orders order : ordersRepository.findByDeletedFalse()) {
            if (order.getUser() != null && order.getUser().getUsername().equals(currentUser.getUsername())) {
                ViewOrdersOnly viewOrder = modelMapper.map(order, ViewOrdersOnly.class);

                // Thiết lập userName từ entity User (kiểm tra user có null không)
                if (order.getUser() != null) {
                    viewOrder.setUserName(order.getUser().getUsername());
                } else {
                    throw new RuntimeException("User không tồn tại cho đơn hàng này.");
                }

                viewOrdersOnlyList.add(viewOrder);
            }
        }

        return viewOrdersOnlyList;
    }


    public Orders createOrder(OrderRequest orderRequest) {
        User user = userService.getCurrentUser();
        Orders order = new Orders();
        List<OrderDetails> orderDetails = new ArrayList<>();
        double total = orderRequest.getTotalAmount();
        order.setUser(user);
        order.setOrderDate(new Date());
        for (OrderDetailsRequest orderDetailsRequest: orderRequest.getOrderDetails()) {
            OrderDetails orderDetail = new OrderDetails();
            orderDetail.setOrders(order);
            orderDetail.setProductId(orderDetailsRequest.getProductId());
            orderDetail.setProductType(orderDetailsRequest.getProductType());
            orderDetail.setQuantity(orderDetailsRequest.getQuantity());
            orderDetail.setUnitPrice(orderDetailsRequest.getUnitPrice());
            orderDetails.add(orderDetail);

        }
        order.setType(orderRequest.getType());
        order.setOrderDetails(orderDetails);
        order.setTotalAmount(total);
        order.setDeliveryStatus("Non-confirmed");
        order.setOrderStatus("Pending");
        order.setDeleted(false);


        return ordersRepository.save(order);
    }

    public void updateStatus(Integer orderId, String status) {
        Orders existingOrder = ordersRepository.findByOrderID(orderId);
        if (existingOrder == null) throw new EntityNotFoundException("Order not found!");
        if (status.equals("PAID")){
            if (existingOrder.getType().equals(TypeOrder.Consignment)){
                for (OrderDetails orderDetail: orderDetailsRepository.findByOrders_OrderID(existingOrder.getOrderID())) {
                    KoiFish fish = koiFishRepository.findKoiFishByKoiID(orderDetail.getProductId());
                    ConsignmentRequest consignmentRequest = fish.getConsignmentRequest();
                    consignmentRequest.setStatus("COMPLETED");
                    consignmentRequestRepository.save(consignmentRequest);
                }
            } else {
                for (OrderDetails orderDetail: orderDetailsRepository.findByOrders_OrderID(existingOrder.getOrderID())) {
                    if (orderDetail.getProductType() == ProductType.KoiFish) {
                        KoiFish koiFish = koiFishRepository.findKoiFishByKoiID(orderDetail.getProductId());
                        koiFish.setIsForSale(false);
                    } else if (orderDetail.getProductType() == ProductType.Batch){
                        batchService.quantityBatch(orderDetail.getProductId(), orderDetail.getQuantity());
                    } else {
                        throw new IllegalArgumentException("Unknown product type");
                    }
                }
            }
        }
        existingOrder.setOrderStatus(status);
        ordersRepository.save(existingOrder);
    }

    public String createUrl(OrderRequest orderRequest) throws  Exception {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime createDate = LocalDateTime.now();
        String formattedCreateDate = createDate.format(formatter);

        Orders orders = createOrder(orderRequest);
        double money = orders.getTotalAmount() * 100;
        String amount = String.valueOf((int) Math.round(money));



        String tmnCode = "KOLWEJSF";
        String secretKey = "FEX7L057BY7A7V4Z039PWVBSYS4IC461";
        String vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        String returnUrl = "http://localhost:5173/success/" + orders.getOrderID();
        String currCode = "VND";

        Map<String, String> vnpParams = new TreeMap<>();
        vnpParams.put("vnp_Version", "2.1.0");
        vnpParams.put("vnp_Command", "pay");
        vnpParams.put("vnp_TmnCode", tmnCode);
        vnpParams.put("vnp_Locale", "vn");
        vnpParams.put("vnp_CurrCode", currCode);
        vnpParams.put("vnp_TxnRef", orders.getOrderID().toString());
        vnpParams.put("vnp_OrderInfo", "Thanh toan cho ma GD: " + orders.getOrderID());
        vnpParams.put("vnp_OrderType", "other");
        vnpParams.put("vnp_Amount",amount);

        vnpParams.put("vnp_ReturnUrl", returnUrl);
        vnpParams.put("vnp_CreateDate", formattedCreateDate);
        vnpParams.put("vnp_IpAddr", "128.199.178.23");

        StringBuilder signDataBuilder = new StringBuilder();
        for (Map.Entry<String, String> entry : vnpParams.entrySet()) {
            signDataBuilder.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8.toString()));
            signDataBuilder.append("=");
            signDataBuilder.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8.toString()));
            signDataBuilder.append("&");
        }
        signDataBuilder.deleteCharAt(signDataBuilder.length() - 1); // Remove last '&'

        String signData = signDataBuilder.toString();
        String signed = generateHMAC(secretKey, signData);

        vnpParams.put("vnp_SecureHash", signed);

        StringBuilder urlBuilder = new StringBuilder(vnpUrl);
        urlBuilder.append("?");
        for (Map.Entry<String, String> entry : vnpParams.entrySet()) {
            urlBuilder.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8.toString()));
            urlBuilder.append("=");
            urlBuilder.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8.toString()));
            urlBuilder.append("&");
        }
        urlBuilder.deleteCharAt(urlBuilder.length() - 1); // Remove last '&'

        return urlBuilder.toString();
    }



    private String generateHMAC(String secretKey, String signData) throws NoSuchAlgorithmException, InvalidKeyException {
        Mac hmacSha512 = Mac.getInstance("HmacSHA512");
        SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
        hmacSha512.init(keySpec);
        byte[] hmacBytes = hmacSha512.doFinal(signData.getBytes(StandardCharsets.UTF_8));

        StringBuilder result = new StringBuilder();
        for (byte b : hmacBytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }



    public void createTransactions(Integer id) {

        Orders orders = ordersRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Order not found!"));

        Payment payment = new Payment();
        payment.setOrders(orders);
        payment.setCreateAt(new Date());
        payment.setPaymentMethod(PaymentMethod.Banking);
        payment.setDescription("Hello!");

        Set<Transactions> setTransactions = new HashSet<>();


        Transactions transactions1 = new Transactions();

        User customer = userService.getCurrentUser();
        transactions1.setFrom(null);
        transactions1.setTo(customer);
        transactions1.setPayment(payment);
        transactions1.setStatus(TransactionsStatus.Success);
        transactions1.setDescription("VNPAY to Customer");
        int point = (int) Math.round(customer.getPointsBalance() + orders.getTotalAmount() * 0.01);
        customer.setPointsBalance(point);
        setTransactions.add(transactions1);


        Transactions transactions3 = new Transactions();
        User manager = userRepository.findFirstByRole(Role.Manager);

        transactions3.setFrom(customer);
        transactions3.setTo(manager);
        transactions3.setPayment(payment);
        transactions3.setStatus(TransactionsStatus.Success);
        transactions3.setDescription("Customer to Manager");
        double newShopBalance = manager.getBalance() + orders.getTotalAmount() ;
        manager.setBalance(newShopBalance);
        setTransactions.add(transactions3);


        payment.setTransactions(setTransactions);


        userRepository.save(customer);
        userRepository.save(manager);
        paymentRepository.save(payment);

        EmailDetail customerEmail = new EmailDetail();
        customerEmail.setUser(customer);
        customerEmail.setSubject("Payment Successful for Order #" + orders.getOrderID());
        String baseUrl = environmentConfig.isProductionEnvironment()
                ? "https://deploy-fe-kappa.vercel.app"
                : "http://localhost:5173";

        customerEmail.setLink(baseUrl + "/orders/" + orders.getOrderID());
        emailService.sendPaymentSuccessEmail(customerEmail, String.valueOf(orders.getTotalAmount()), payment.getPaymentID().toString());
    }


    public void deleteOrder(Integer id) {
        Orders order = ordersRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found for this id :: " + id));
        try {
            ordersRepository.delete(order);
        }catch (Exception e) {
            order.setDeleted(true);
            ordersRepository.save(order);
        }
    }

    public void updateDeliveryStatus(Integer orderId, String status) {
        Orders existingOrder = ordersRepository.findByOrderID(orderId);
        if (existingOrder == null) throw new EntityNotFoundException("Order not found!");
        existingOrder.setDeliveryStatus(status);
        ordersRepository.save(existingOrder);
    }
}

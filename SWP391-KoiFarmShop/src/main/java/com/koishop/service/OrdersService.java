package com.koishop.service;

import com.koishop.entity.*;
import com.koishop.exception.EntityNotFoundException;
import com.koishop.models.orderdetails_model.OrderDetailsRequest;
import com.koishop.models.orders_model.OrderRequest;
import com.koishop.models.orders_model.OrderResponse;
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
    KoiFishRepository koiFishRepository;

    @Autowired
    BatchRepository batchRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PaymentRepository paymentRepository;

    @Autowired
    KoiFishService koiFishService;

    @Autowired
    BatchService batchService;


    public Orders getOrderById(Integer id) {
        Orders order = ordersRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found!"));
        return order;
    }

    public List<OrderResponse> getAllOrders() {
        List<OrderResponse> orderResponses = new ArrayList<>();
        for (Orders order : ordersRepository.findAll()) {
            OrderResponse orderResponse = modelMapper.map(order, OrderResponse.class);
            orderResponse.setUserName(order.getUser().getUsername());
            orderResponse.setPaymentId(order.getPayment().getPaymentID());
            orderResponses.add(orderResponse);
        }
        return orderResponses;
    }

    public List<OrderResponse> getAllOrdersByUser() {
        User user = userService.getCurrentUser();
        List<OrderResponse> orderResponses = new ArrayList<>();
        for (Orders order : ordersRepository.findAll()) {
            if (order.getUser().getUsername().equals(user.getUsername())) {
                OrderResponse orderResponse = modelMapper.map(order, OrderResponse.class);
                orderResponse.setUserName(order.getUser().getUsername());
                orderResponse.setPaymentId(order.getPayment().getPaymentID());
                orderResponses.add(orderResponse);
            }
        }
        return orderResponses;
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

            if (orderDetailsRequest.getProductType() == ProductType.KoiFish) {
                koiFishService.updateIsForSale(orderDetailsRequest.getProductId());
            } else if (orderDetailsRequest.getProductType() == ProductType.Batch){
                batchService.updateIsSale(orderDetailsRequest.getProductId());
            } else {
                throw new IllegalArgumentException("Unknown product type");
            }

            orderDetails.add(orderDetail);
        }
        order.setOrderDetails(orderDetails);
        order.setTotalAmount(total);
        order.setOrderStatus("Pending");
        return ordersRepository.save(order);
    }

    public void updateOrderStatus(String orderId, String status) {
        Orders order = ordersRepository.findById(Integer.parseInt(orderId))
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setOrderStatus(status); // Cập nhật trạng thái đơn hàng
        ordersRepository.save(order); // Lưu đơn hàng đã cập nhật
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

    public List<Integer> IncomePerMonth() {
        List<Integer> incomePerMonth = new ArrayList<>(Collections.nCopies(12, 0));
        for (Orders order : ordersRepository.findAll()) {
            int month = order.getOrderDate().getMonth();
            incomePerMonth.set(month, incomePerMonth.get(month) + order.getTotalAmount().intValue());
        }
        return incomePerMonth;
    }


    public String createUrl(OrderRequest orderRequest) throws  Exception {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime createDate = LocalDateTime.now();
        String formattedCreateDate = createDate.format(formatter);

        // Code của mình
        Orders orders = createOrder(orderRequest);
        Double money = orders.getTotalAmount() * 100;
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
        // Tìm order
        Orders orders = ordersRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Order not found!"));

        // Tạo payment
        Payment payment = new Payment();
        payment.setOrders(orders);
        payment.setCreateAt(new Date());
        payment.setPaymentMethod(PaymentMethod.Banking);
        payment.setDescription("Hello!");

        Set<Transactions> setTransactions = new HashSet<>();

        // Tạo transactions
        Transactions transactions1 = new Transactions();
        // VNPAY to customer
        User customer = userService.getCurrentUser();
        transactions1.setFrom(null);
        transactions1.setTo(customer);
        transactions1.setPayment(payment);
        transactions1.setStatus(TransactionsStatus.Success);
        transactions1.setDescription("VNPAY to Customer");
        double point = customer.getPointsBalance() + orders.getTotalAmount() * 0.01;
        customer.setPointsBalance(point);
        setTransactions.add(transactions1);


//        Transactions transactions2 = new Transactions();
//        // Customer to Admin
//        User admin = userRepository.findUserByRole(Role.Admin);
//        transactions2.setFrom(customer);
//        transactions2.setTo(admin);
//        transactions2.setPayment(payment);
//        transactions2.setStatus(TransactionsStatus.Success);
//        transactions2.setDescription("Customer to Admin");
//        double newBalance = admin.getBalance() + orders.getTotalAmount()*0.1;
//        admin.setBalance(newBalance);
//        setTransactions.add(transactions2);


        Transactions transactions3 = new Transactions();
        // Customer to Manager

        // Lấy productType từ OrderDetails
        OrderDetails orderDetail = orders.getOrderDetails().get(0);
        ProductType productType = orderDetail.getProductType();
        User manager;

// Kiểm tra loại sản phẩm để tìm Manager
        if (productType == ProductType.KoiFish) {
            // Tìm manger dựa trên sản phẩm cá thể
            KoiFish koiFish = koiFishRepository.findById(orderDetail.getProductId())
                    .orElseThrow(() -> new EntityNotFoundException("KoiFish not found!"));
            manager = koiFish.getManager();
        } else if (productType == ProductType.Batch) {
            // Tìm manager dựa trên batch
            Batch batch = batchRepository.findById(orderDetail.getProductId())
                    .orElseThrow(() -> new EntityNotFoundException("Batch not found!"));
            manager = batch.getManager();
        } else {
            throw new IllegalArgumentException("Unknown product type");
        }


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
    }

}

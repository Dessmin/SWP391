package com.koishop.service;

import com.koishop.entity.KoiFish;
import com.koishop.repository.ConsignmentRequestRepository;
import com.koishop.repository.KoiFishRepository;
import com.koishop.repository.OrdersRepository;
import com.koishop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashBoardService {

    @Autowired
    private KoiFishRepository koiFishRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrdersRepository ordersRepository;
    @Autowired
    private BreedsService breedsService;
    @Autowired
    private OrdersService ordersService;
    @Autowired
    private ConsignmentRequestRepository consignmentRequestRepository;

    public Map<String, Object> getDashboard(){
        Map<String, Object> dashboard = new HashMap<>();

        long totalKoiFish =0;
        for (KoiFish koiFish : koiFishRepository.findAllByIsForSaleAndDeletedIsFalse(true)){
            totalKoiFish += 1;
        }
        dashboard.put("totalKoiFish", totalKoiFish);

        long customers = userRepository.findAllByDeletedIsFalse().size();
        dashboard.put("customers", customers);

        long orders = ordersRepository.count();
        dashboard.put("orders", orders);

        long consigments = consignmentRequestRepository.count();
        dashboard.put("consigments", consigments);

        List<Object[]> BreedSold = breedsService.BreedsSold();
        List<Map<String, Object>> breeds = new ArrayList<>();
        for (Object[] objects : BreedSold) {
            Map<String, Object> breed = new HashMap<>();
            breed.put("breedName", objects[0]);
            breed.put("totalSold", objects[1]);
            breeds.add(breed);
        }
        dashboard.put("breeds", breeds);
        return dashboard;
    }

    public Map<String, Object> income() {
        Map<String, Object> dashboardIncome = new HashMap<>();
        List<Object[]> incomeMonthly = ordersRepository.findIncomeLast3Years();
        List<Map<String, Object>> incomePerMonth = new ArrayList<>();
        for (Object[] objects : incomeMonthly) {
            Map<String, Object> income = new HashMap<>();
            income.put("Year", objects[0]);
            income.put("Month", objects[1]);
            income.put("Income", objects[2]);
            incomePerMonth.add(income);
        }
        dashboardIncome.put("incomeMonthly", incomePerMonth);
        return dashboardIncome;
    }

}

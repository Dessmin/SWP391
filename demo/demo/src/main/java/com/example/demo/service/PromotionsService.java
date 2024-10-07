package com.example.demo.service;

import com.example.demo.entity.Promotions;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.repository.PromotionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromotionsService {
    @Autowired
    private PromotionsRepository promotionsRepository;

    public List<Promotions> getAllPromotions() {
        return promotionsRepository.findAll();
    }


    public Promotions createPromotion(Promotions promotion) {
        return promotionsRepository.save(promotion);
    }

    public Promotions updatePromotion(Long id, Promotions promotionDetails) {
        Promotions promotion = promotionsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Promotion not found"));
//
//        promotion.setPromotionName(promotionDetails.getPromotionName());
//        promotion.setDescription(promotionDetails.getDescription());
//        promotion.setDiscountPercentage(promotionDetails.getDiscountPercentage());
//        promotion.setStartDate(promotionDetails.getStartDate());
//        promotion.setEndDate(promotionDetails.getEndDate());

        return promotionsRepository.save(promotion);
    }

    public void deletePromotion(Long id) {
        Promotions promotion = promotionsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Promotion not found"));
        promotionsRepository.delete(promotion);
    }
}

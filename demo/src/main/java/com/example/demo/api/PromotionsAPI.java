package com.example.demo.api;

import com.example.demo.entity.Promotions;
import com.example.demo.service.PromotionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/promotions")
public class PromotionsAPI {
    @Autowired
    private PromotionsService promotionsService;

    @GetMapping("list-promotions")
    public List<Promotions> getAllPromotions() {
        return promotionsService.getAllPromotions();
    }



    @PostMapping("add-promotion")
    public ResponseEntity<Promotions> createPromotion(@RequestBody Promotions promotion) {
        Promotions createdPromotion = promotionsService.createPromotion(promotion);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPromotion);
    }

    @PutMapping("/{promotionID}")
    public ResponseEntity<Promotions> updatePromotion(@PathVariable Long promotionID, @RequestBody Promotions promotionDetails) {
        Promotions updatedPromotion = promotionsService.updatePromotion(promotionID, promotionDetails);
        return ResponseEntity.ok(updatedPromotion);
    }

    @DeleteMapping("/{promotionID}")
    public ResponseEntity<Void> deletePromotion(@PathVariable Long promotionID) {
        promotionsService.deletePromotion(promotionID);
        return ResponseEntity.noContent().build();
    }
}

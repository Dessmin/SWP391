package com.koishop.api;

import com.koishop.entity.Promotions;
import com.koishop.service.PromotionsService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "https://deploy-fe-kappa.vercel.app"})
@SecurityRequirement(name = "api")
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
    @PreAuthorize("hasAuthority('Manager')")
    public ResponseEntity<Promotions> createPromotion(@Valid @RequestBody Promotions promotion) {
        Promotions createdPromotion = promotionsService.createPromotion(promotion);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPromotion);
    }

    @GetMapping("/{code}/discount")
    public Integer getDiscountPromotions(@PathVariable String code) {
        return promotionsService.getCode(code);
    }

    @PutMapping("/{promotionID}")
    @PreAuthorize("hasAuthority('Manager')")
    public ResponseEntity<Promotions> updatePromotion(@PathVariable Long promotionID, @Valid @RequestBody Promotions promotionDetails) {
        Promotions updatedPromotion = promotionsService.updatePromotion(promotionID, promotionDetails);
        return ResponseEntity.ok(updatedPromotion);
    }

    @DeleteMapping("/{promotionID}")
    @PreAuthorize("hasAuthority('Manager')")
    public ResponseEntity<Void> deletePromotion(@PathVariable Long promotionID) {
        promotionsService.deletePromotion(promotionID);
        return ResponseEntity.noContent().build();
    }
}

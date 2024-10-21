package com.koishop.api;

import com.koishop.models.fish_model.*;
import com.koishop.service.KoiFishService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8080/")
@SecurityRequirement(name = "api")
@RestController
@RequestMapping("/api/koi-fishes")
public class KoiFishAPI {

    @Autowired
    KoiFishService koiFishService;

    // Lấy tất cả KoiFish
    @GetMapping("list")
    public FishResponse getAllKoiFish(@RequestParam int page) {
        return koiFishService.getAllKoiFish(page, 6);
    }

    // Tạo KoiFish mới
    @PostMapping("/add")
    public ViewFish createKoiFish(@Valid @RequestBody ViewFish koiFish) {
        return koiFishService.createKoiFish(koiFish);
    }

    // Cập nhật KoiFish theo ID
    @PutMapping("/{koiId}/update")
    public ResponseEntity updateKoiFish(@PathVariable Integer koiId, @RequestBody ViewFish koiFishDetails) {
        ViewFish defaultFish = koiFishService.updateKoiFish(koiId, koiFishDetails);
        return ResponseEntity.ok(defaultFish);
    }

    @GetMapping("/{koiId}/checkIsForSale")
    public boolean checkIsForSale(@PathVariable Integer koiId) {
        return koiFishService.getIsForSale(koiId);
    }

    @PutMapping("/{koiId}/updateIsForSale")
    public boolean updateIsForSale(@PathVariable Integer koiId) {
        return koiFishService.updateIsForSale(koiId);
    }

    @GetMapping("/{koiFishName}/koiFish")
    public ResponseEntity getKoiFishByName(@PathVariable String koiFishName) {
        ViewFish koiFish = koiFishService.getKoiFishByName(koiFishName);
        return ResponseEntity.ok(koiFish);
    }

    @GetMapping("/koiFish/{id}")
    public ResponseEntity getKoiFishByID(@PathVariable int id) {
        ViewFish koiFish = koiFishService.getKoiFishById(id);
        return ResponseEntity.ok(koiFish);
    }

    @GetMapping("/{koiFishName}/search")
    public List<String> searchKoiFish(@PathVariable String koiFishName) {
        return koiFishService.searchKoiFishByName(koiFishName);
    }

    @GetMapping("/{breed}")
    public FishResponse getKoiFishByOrigin(@PathVariable String breed, @RequestParam int page) {
        return koiFishService.getKoiFishesByBreed(breed, page, 6);
    }

    @GetMapping("/koiFish/cart/{id}")
    public FishForCart getIdforCart(@PathVariable int id) {
        return koiFishService.getFishCart(id);
    }

    @GetMapping("listfish")
    public List<ListFishForManager> ListFish() {return koiFishService.ListFish();}

    @GetMapping("/{koiId}/fishName")
    public String getFishName(@PathVariable Integer koiId) {return koiFishService.getFishName(koiId);}

    // Xóa KoiFish theo ID
    @PutMapping("/{koiId}/delete")
    public ResponseEntity<Void> deleteKoiFish(@PathVariable(value = "koiId") Integer koiId) {
        koiFishService.deleteKoiFish(koiId);
        return ResponseEntity.noContent().build();
    }
}

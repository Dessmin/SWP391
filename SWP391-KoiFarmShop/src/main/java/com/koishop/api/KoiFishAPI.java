package com.koishop.api;

import com.koishop.models.fish_model.DefaultFish;
import com.koishop.models.fish_model.FishForList;
import com.koishop.models.fish_model.FishResponse;
import com.koishop.models.fish_model.ViewFish;
import com.koishop.service.KoiFishService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    @PostMapping("/{breed}/{origin}/add")
    public ResponseEntity createKoiFish(@PathVariable String breed, @PathVariable String origin, @Valid @RequestBody DefaultFish koiFish) {
        ViewFish defaultFish = koiFishService.createKoiFish(breed, origin, koiFish);
        return ResponseEntity.ok(defaultFish);
    }

    // Cập nhật KoiFish theo ID
    @PutMapping("/{koiId}/{breed}/{origin}/update")
    public ResponseEntity updateKoiFish(@PathVariable Integer koiId, @PathVariable String breed, @PathVariable String origin, @RequestBody DefaultFish koiFishDetails) {
        ViewFish defaultFish = koiFishService.updateKoiFish(koiId, breed, origin, koiFishDetails);
        return ResponseEntity.ok(defaultFish);
    }
    @PutMapping("/{koiId}/updateIsForSale")
    public ResponseEntity updateIsForSale(@PathVariable Integer koiId) {
        koiFishService.updateIsForSale(koiId);
        return ResponseEntity.ok("Set successful");
    }

    @GetMapping("/{koiFishName}/koiFish")
    public ResponseEntity getKoiFish(@PathVariable String koiFishName) {
        ViewFish koiFish = koiFishService.getKoiFishByName(koiFishName);
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

    // Xóa KoiFish theo ID
    @DeleteMapping("/{koiId}")
    public ResponseEntity<Void> deleteKoiFish(@PathVariable(value = "id") Integer koiId) {
        koiFishService.deleteKoiFish(koiId);
        return ResponseEntity.noContent().build();
    }


}

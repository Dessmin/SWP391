package com.example.demo.api;

import com.example.demo.entity.KoiFish;
import com.example.demo.models.fish_model.DefaultFish;
import com.example.demo.models.fish_model.FishForList;
import com.example.demo.models.fish_model.ViewFish;
import com.example.demo.service.KoiFishService;
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
    public List<FishForList> getAllKoiFish() {
        return koiFishService.getAllKoiFish();
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

    // Xóa KoiFish theo ID
    @DeleteMapping("/{koiId}")
    public ResponseEntity<Void> deleteKoiFish(@PathVariable(value = "id") Integer koiId) {
        koiFishService.deleteKoiFish(koiId);
        return ResponseEntity.noContent().build();
    }


}

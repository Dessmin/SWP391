package com.example.demo.api;

import com.example.demo.entity.KoiFish;
import com.example.demo.service.KoiFishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/koi-fishes")
public class KoiFishAPI {

    @Autowired
    KoiFishService koiFishService;

    // Lấy tất cả KoiFish
    @GetMapping("list-KoiFishs")
    public List<KoiFish> getAllKoiFish() {
        return koiFishService.getAllKoiFish();
    }

    // Lấy KoiFish theo ID


    // Tạo KoiFish mới
    @PostMapping("add-KoiFish")
    public KoiFish createKoiFish(@RequestBody KoiFish koiFish) {
        return koiFishService.createKoiFish(koiFish);
    }

    // Cập nhật KoiFish theo ID
    @PutMapping("/{koiId}")
    public ResponseEntity<KoiFish> updateKoiFish(@PathVariable(value = "id") Integer koiId, @RequestBody KoiFish koiFishDetails) {
        KoiFish updatedKoiFish = koiFishService.updateKoiFish(koiId, koiFishDetails);
        return ResponseEntity.ok(updatedKoiFish);
    }

    // Xóa KoiFish theo ID
    @DeleteMapping("/{koiId}")
    public ResponseEntity<Void> deleteKoiFish(@PathVariable(value = "id") Integer koiId) {
        koiFishService.deleteKoiFish(koiId);
        return ResponseEntity.noContent().build();
    }


}

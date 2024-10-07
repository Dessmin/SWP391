package com.example.demo.api;

import com.example.demo.entity.Breeds;
import com.example.demo.service.BreedsService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8080/")
@SecurityRequirement(name = "api")
@RestController
@RequestMapping("/api/breeds")
public class BreedsAPI {
    @Autowired
    private BreedsService breedsService;

    // Lấy tất cả danh sách Breeds
    @GetMapping("list-breeds")
    public List<Breeds> getAllBreeds() {
        return breedsService.getAllBreeds();
    }

    // Lấy Breed theo ID


    // Tạo Breed mới
    @PostMapping("add-breed")
    public Breeds createBreed(@RequestBody Breeds breed) {
        return breedsService.createBreed(breed);
    }

    // Cập nhật Breed theo ID
    @PutMapping("/{breedID}")
    public ResponseEntity<Breeds> updateBreed(@PathVariable(value = "id") Integer breedID, @RequestBody Breeds breedDetails) {
        Breeds updatedBreed = breedsService.updateBreed(breedID, breedDetails);
        return ResponseEntity.ok(updatedBreed);
    }

    // Xóa Breed theo ID
    @DeleteMapping("/{breedID}")
    public ResponseEntity<Void> deleteBreed(@PathVariable(value = "id") Integer breedID) {
        breedsService.deleteBreed(breedID);
        return ResponseEntity.noContent().build();
    }
}

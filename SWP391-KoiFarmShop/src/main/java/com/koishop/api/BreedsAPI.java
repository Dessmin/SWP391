package com.koishop.api;

import com.koishop.entity.Breeds;
import com.koishop.service.BreedsService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "https://deploy-fe-kappa.vercel.app"})
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

    @GetMapping("list-breedName")
    public List<String> getAllBreedNames() {
        return breedsService.listBreedNames();
    }

    @GetMapping("/{breedName}")
    public Breeds getBreeds(@PathVariable String breedName) {
        return breedsService.getBreedByName(breedName);
    }

    // Tạo Breed mới
    @PostMapping("add-breed")
    public Breeds createBreed(@RequestBody Breeds breed) {
        return breedsService.createBreed(breed);
    }

    // Cập nhật Breed theo ID
    @PutMapping("/{breedID}")
    public ResponseEntity<Breeds> updateBreed(@PathVariable(value = "breedID") Integer breedID, @RequestBody Breeds breedDetails) {
        Breeds updatedBreed = breedsService.updateBreed(breedID, breedDetails);
        return ResponseEntity.ok(updatedBreed);
    }

    // Xóa Breed theo ID
    @PutMapping("/{breedID}/delete")
    public ResponseEntity<Void> deleteBreed(@PathVariable Integer breedID) {
        breedsService.deleteBreed(breedID);
        return ResponseEntity.noContent().build();
    }
}

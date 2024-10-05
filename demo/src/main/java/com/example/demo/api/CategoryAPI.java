package com.example.demo.api;

import com.example.demo.entity.Category;
import com.example.demo.service.CategoryService;
import jakarta.validation.Valid;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin("*")
public class CategoryAPI {


    @Autowired
    private CategoryService categoryService;

    // Get all categories
    @GetMapping("list-category")
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    // Create a new category
    @PostMapping("add-category")
    public Category createCategory(@RequestBody Category category) {
        return categoryService.createCategory(category);
    }

    // Update category by ID
    @PutMapping("/{categoryId}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long categoryId, @RequestBody Category categoryDetails) {
        Category updatedCategory = categoryService.updateCategory(categoryId, categoryDetails);
        return ResponseEntity.ok(updatedCategory);
    }

    // Delete category
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.noContent().build();
    }
}

package com.koishop.repository;

import com.koishop.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    //Category findCategoryByCategoryId(long categoryId);
}

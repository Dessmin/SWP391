package com.example.demo.repository;

import com.example.demo.entity.Promotions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PromotionsRepository extends JpaRepository<Promotions, Long> {
}

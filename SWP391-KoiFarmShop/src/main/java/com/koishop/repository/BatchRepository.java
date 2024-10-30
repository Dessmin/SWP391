package com.koishop.repository;

import com.koishop.entity.Batch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BatchRepository extends JpaRepository<Batch, Integer> {
    Page<Batch> findByBreed_BreedNameAndIsForSaleAndDeletedIsFalseAndQuantityGreaterThan(String breed, boolean isSale, Pageable pageable, int quantity);
    Batch findByBatchID(Integer batchID);

    Page<Batch> findByIsForSaleAndDeletedIsFalseAndQuantityGreaterThan(boolean isSale, Pageable pageable, int quantity);
}

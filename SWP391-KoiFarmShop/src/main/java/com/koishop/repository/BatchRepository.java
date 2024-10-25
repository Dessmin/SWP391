package com.koishop.repository;

import com.koishop.entity.Batch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Objects;

public interface BatchRepository extends JpaRepository<Batch, Integer> {
    Page<Batch> findByBreed_BreedName(String breed, Pageable pageable);
    Batch findByBatchID(Integer batchID);
}

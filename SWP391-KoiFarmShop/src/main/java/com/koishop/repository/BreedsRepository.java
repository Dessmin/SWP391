package com.koishop.repository;

import com.koishop.entity.Breeds;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BreedsRepository extends JpaRepository<Breeds, Integer> {
    Breeds getBreedsByBreedName(String breed);
    List<Breeds> findAllByDeletedIsFalse();
}

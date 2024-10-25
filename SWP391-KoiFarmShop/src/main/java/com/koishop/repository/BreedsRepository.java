package com.koishop.repository;

import com.koishop.entity.Breeds;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Objects;

public interface BreedsRepository extends JpaRepository<Breeds, Integer> {
    Breeds getBreedsByBreedName(String breed);
    List<Breeds> findAllByDeletedIsFalse();
}

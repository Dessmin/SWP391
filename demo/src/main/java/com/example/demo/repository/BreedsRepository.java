package com.example.demo.repository;

import com.example.demo.entity.Breeds;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BreedsRepository extends JpaRepository<Breeds, Integer> {
    Breeds getBreedsByBreedName(String breed);
}

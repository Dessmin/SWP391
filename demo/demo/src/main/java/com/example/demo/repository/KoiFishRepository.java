package com.example.demo.repository;

import com.example.demo.entity.KoiFish;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;

public interface KoiFishRepository extends JpaRepository<KoiFish, Integer> {

    KoiFish findKoiFishByFishName(String name);

    KoiFish findKoiFishByFishNameContains(String name);
}

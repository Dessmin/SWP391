package com.koishop.repository;

import com.koishop.entity.KoiFish;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KoiFishRepository extends JpaRepository<KoiFish, Integer> {

    KoiFish findKoiFishByFishName(String name);

    KoiFish findKoiFishByFishNameContains(String name);
}

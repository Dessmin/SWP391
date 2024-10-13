package com.koishop.repository;

import com.koishop.entity.KoiFish;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KoiFishRepository extends JpaRepository<KoiFish, Integer> {

    KoiFish findKoiFishByFishName(String name);

    KoiFish findKoiFishByKoiID(Integer koiID);

    KoiFish findKoiFishByFishNameContains(String name);

    Page<KoiFish> findAll(Pageable pageable);
    Page<KoiFish> findByBreed_BreedName(String breedName, Pageable pageable);
}

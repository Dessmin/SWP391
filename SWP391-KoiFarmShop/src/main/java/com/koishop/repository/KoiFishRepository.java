package com.koishop.repository;

import com.koishop.entity.KoiFish;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KoiFishRepository extends JpaRepository<KoiFish, Integer> {

    KoiFish findKoiFishByFishName(String name);

    KoiFish findKoiFishByKoiID(Integer koiID);

    Page<KoiFish> findAll(Pageable pageable);
    Page<KoiFish> findByIsForSaleAndDeletedIsFalse(Boolean isforsale, Pageable pageable);

    List<KoiFish> findAllByIsForSaleAndDeletedIsFalse(boolean isSale);

    Page<KoiFish> findByBreed_BreedNameAndIsForSaleAndDeletedIsFalseAndSizeBetweenAndPriceBetween(String breed, boolean isForSale, double minSize, double maxSize, double minPrice, double maxPrice, Pageable pageable);

    Page<KoiFish> findByIsForSaleAndDeletedIsFalseAndSizeBetweenAndPriceBetween(boolean isForSale, double minSize, double maxSize, double minPrice, double maxPrice, Pageable pageable);
}

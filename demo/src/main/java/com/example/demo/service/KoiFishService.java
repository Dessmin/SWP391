package com.example.demo.service;

import com.example.demo.entity.KoiFish;
import com.example.demo.repository.KoiFishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KoiFishService {

    @Autowired
    KoiFishRepository koiFishRepository;

    public List<KoiFish> getAllKoiFish() {
        List<KoiFish> koiFishes = koiFishRepository.findAll();
        return koiFishes;
    }


    public KoiFish createKoiFish(KoiFish koiFish) {
        return koiFishRepository.save(koiFish);
    }

    public KoiFish updateKoiFish(Integer id, KoiFish koiFishDetails) {
        KoiFish koiFish = koiFishRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("KoiFish not found for this id :: " + id));

        koiFish.setCertificateID(koiFishDetails.getCertificateID());
        koiFish.setBreedID(koiFishDetails.getBreedID());
        koiFish.setPromotionID(koiFishDetails.getPromotionID());
        koiFish.setOriginN(koiFishDetails.getOriginN());
        koiFish.setDescription(koiFishDetails.getDescription());
        koiFish.setGender(koiFishDetails.getGender());
        koiFish.setUserID(koiFishDetails.getUserID());
        koiFish.setAge(koiFishDetails.getAge());
        koiFish.setDiet(koiFishDetails.getDiet());
        koiFish.setSize(koiFishDetails.getSize());
        koiFish.setPrice(koiFishDetails.getPrice());
        koiFish.setFood(koiFishDetails.getFood());
        koiFish.setIsForSale(koiFishDetails.getIsForSale());
        koiFish.setScreeningRate(koiFishDetails.getScreeningRate());
        koiFish.setImage(koiFishDetails.getImage());
        return koiFishRepository.save(koiFish);
    }

    public void deleteKoiFish(Integer id) {
        KoiFish koiFish = koiFishRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("KoiFish not found for this id :: " + id));
        koiFishRepository.delete(koiFish);
    }

}

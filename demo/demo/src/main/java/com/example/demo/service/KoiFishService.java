package com.example.demo.service;

import com.example.demo.entity.Breeds;
import com.example.demo.entity.KoiFish;
import com.example.demo.entity.Origin;
import com.example.demo.models.fish_model.DefaultFish;
import com.example.demo.models.fish_model.FishForList;
import com.example.demo.models.fish_model.ViewFish;
import com.example.demo.repository.KoiFishRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class KoiFishService {

    @Autowired
    KoiFishRepository koiFishRepository;
    @Autowired
    BreedsService breedsService;
    @Autowired
    OriginService originService;
    @Autowired
    @Lazy
    ModelMapper modelMapper;

    public List<FishForList> getAllKoiFish() {
        List<FishForList> koiFishes = new ArrayList<>();
        for (KoiFish koiFish : koiFishRepository.findAll()) {
            FishForList fishForList = modelMapper.map(koiFish, FishForList.class);
            fishForList.setBreed(koiFish.getBreed().getBreedName());
            fishForList.setOrigin(koiFish.getOrigin().getOriginName());
            koiFishes.add(fishForList);
        }
        return koiFishes;
    }


    public ViewFish createKoiFish(String breed, String origin, DefaultFish fishCreate) {

        KoiFish newKoiFish = modelMapper.map(fishCreate, KoiFish.class);
        Breeds breeds = breedsService.getBreedByName(breed);
        newKoiFish.setBreed(breeds);
        Origin origin1 = originService.getOriginByName(origin);
        newKoiFish.setOrigin(origin1);
        newKoiFish.setIsForSale(false);
        modelMapper.map(koiFishRepository.save(newKoiFish), DefaultFish.class);
        return detailsKoiFish(newKoiFish.getKoiID());
    }

    public ViewFish updateKoiFish(Integer id,String breed, String origin, DefaultFish koiFishDetails) {
        KoiFish koiFish = koiFishRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("KoiFish not found for this id :: " + id));

        modelMapper.map(koiFishDetails, koiFish);
        Breeds breeds = breedsService.getBreedByName(breed);
        koiFish.setBreed(breeds);
        Origin origin1 = originService.getOriginByName(origin);
        koiFish.setOrigin(origin1);
        modelMapper.map(koiFishRepository.save(koiFish), DefaultFish.class);
        return detailsKoiFish(koiFish.getKoiID());
    }

    public void updateIsForSale(Integer id) {
        KoiFish koiFish = koiFishRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("KoiFish not found for this id :: " + id));
        koiFish.setIsForSale(!koiFish.getIsForSale());
        koiFishRepository.save(koiFish);
    }

    public ViewFish detailsKoiFish(Integer id) {
        KoiFish koiFish = koiFishRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("KoiFish not found for this id :: " + id));
        ViewFish viewFish = modelMapper.map(koiFish, ViewFish.class);
        viewFish.setBreed(koiFish.getBreed().getBreedName());
        viewFish.setOrigin(koiFish.getOrigin().getOriginName());
        return viewFish;
    }

    public ViewFish getKoiFishByName(String name) {
        KoiFish koiFish = koiFishRepository.findKoiFishByFishName(name);
        return detailsKoiFish(koiFish.getKoiID());
    }

    public List<String> searchKoiFishByName(String name) {
        List<String> koiFishNames = new ArrayList<>();
        for (KoiFish koiFish : koiFishRepository.findAll()) {
            if (koiFish.getFishName().toLowerCase().contains(name.toLowerCase())) {
                koiFishNames.add(koiFish.getFishName());
            }
        }
        return koiFishNames;
    }

    public List<FishForList> getKoiFishesByOrigin(String origin) {
        List<FishForList> koiFishes = new ArrayList<>();
        for (KoiFish koiFish : koiFishRepository.findAll()) {
            if(koiFish.getOrigin().getOriginName().equals(origin)) {
                FishForList fishForList = modelMapper.map(koiFish, FishForList.class);
                fishForList.setBreed(koiFish.getBreed().getBreedName());
                fishForList.setOrigin(koiFish.getOrigin().getOriginName());
                koiFishes.add(fishForList);
            }
        }
        return koiFishes;
    }


    public void deleteKoiFish(Integer id) {
        KoiFish koiFish = koiFishRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("KoiFish not found for this id :: " + id));
        koiFishRepository.delete(koiFish);
    }

}

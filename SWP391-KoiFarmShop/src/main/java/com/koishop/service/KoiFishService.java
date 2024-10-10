package com.koishop.service;

import com.koishop.entity.Breeds;
import com.koishop.entity.KoiFish;
import com.koishop.entity.Origin;
import com.koishop.models.fish_model.DefaultFish;
import com.koishop.models.fish_model.FishForList;
import com.koishop.models.fish_model.FishResponse;
import com.koishop.models.fish_model.ViewFish;
import com.koishop.repository.KoiFishRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    public FishResponse getAllKoiFish(int page, int size) {
        List<FishForList> fishForLists = new ArrayList<>();
        for (KoiFish koiFish : koiFishRepository.findAll(PageRequest.of(page, size))) {
            FishForList fishForList = modelMapper.map(koiFish, FishForList.class);
            fishForList.setBreed(koiFish.getBreed().getBreedName());
            fishForList.setOrigin(koiFish.getOrigin().getOriginName());
            fishForLists.add(fishForList);
        }
        FishResponse fishResponse = new FishResponse();
        fishResponse.setTotalPages(koiFishRepository.findAll(PageRequest.of(page, size)).getTotalPages());
        fishResponse.setTotalElements(koiFishRepository.findAll(PageRequest.of(page, size)).getTotalElements());
        fishResponse.setPage(page);
        fishResponse.setContent(fishForLists);
        return fishResponse;
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

    public boolean updateIsForSale(Integer id) {
        KoiFish koiFish = koiFishRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("KoiFish not found for this id :: " + id));
        koiFish.setIsForSale(!koiFish.getIsForSale());
        koiFishRepository.save(koiFish);
        return koiFish.getIsForSale();
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

    public FishResponse getKoiFishesByBreed(String breed, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<KoiFish> koiFishPage = koiFishRepository.findByBreed_BreedName(breed, pageable);
        List<FishForList> fishList = new ArrayList<>();
        for (KoiFish koiFish : koiFishRepository.findByBreed_BreedName(breed, pageable)) {
            if(koiFish.getBreed().getBreedName().equals(breed)) {
                FishForList fishForList = modelMapper.map(koiFish, FishForList.class);
                fishForList.setBreed(koiFish.getBreed().getBreedName());
                fishForList.setOrigin(koiFish.getOrigin().getOriginName());
                fishList.add(fishForList);
            }
        }
        FishResponse fishResponse = new FishResponse();
        fishResponse.setTotalPages(koiFishPage.getTotalPages());
        fishResponse.setTotalElements(koiFishPage.getTotalElements());
        fishResponse.setPage(page);
        fishResponse.setContent(fishList);
        return fishResponse;
    }


    public void deleteKoiFish(Integer id) {
        KoiFish koiFish = koiFishRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("KoiFish not found for this id :: " + id));
        koiFishRepository.delete(koiFish);
    }

    public ViewFish getKoiFishById(int id) {
        return modelMapper.map(koiFishRepository.findById(id), ViewFish.class);
    }
}

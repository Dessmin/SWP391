package com.koishop.service;

import com.koishop.entity.KoiFish;
import com.koishop.exception.EntityNotFoundException;
import com.koishop.models.fish_model.*;
import com.koishop.repository.KoiFishRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
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
    @Autowired
    UserService userService;

    public FishResponse getAllKoiFish(int page, int size) {
        List<FishForList> fishForLists = new ArrayList<>();
        for (KoiFish koiFish : koiFishRepository.findByIsForSaleAndDeletedIsFalse(true, PageRequest.of(page, size))) {
            FishForList fishForList = modelMapper.map(koiFish, FishForList.class);
            fishForList.setBreed(koiFish.getBreed().getBreedName());
            fishForList.setOrigin(koiFish.getOrigin().getOriginName());
            fishForLists.add(fishForList);
        }
        FishResponse fishResponse = new FishResponse();
        fishResponse.setTotalPages(koiFishRepository.findByIsForSaleAndDeletedIsFalse(true, PageRequest.of(page, size)).getTotalPages());
        fishResponse.setTotalElements(koiFishRepository.findByIsForSaleAndDeletedIsFalse(true, PageRequest.of(page, size)).getTotalElements());
        fishResponse.setPage(page);
        fishResponse.setContent(fishForLists);
        return fishResponse;
    }

    public List<ListFishForManager> ListFish() {
        List<ListFishForManager> fishForLists = new ArrayList<>();
        for (KoiFish koiFish : koiFishRepository.findAll()) {
            ListFishForManager fishForList = modelMapper.map(koiFish, ListFishForManager.class);
            fishForList.setBreed(koiFish.getBreed().getBreedName());
            fishForList.setOrigin(koiFish.getOrigin().getOriginName());
            fishForLists.add(fishForList);
        }
        return fishForLists;
    }

    public ViewFish createKoiFish(ViewFish fishCreate) {
        KoiFish newKoiFish = modelMapper.map(fishCreate, KoiFish.class);
        newKoiFish.setBreed(breedsService.getBreedByName(fishCreate.getBreed()));
        newKoiFish.setOrigin(originService.getOriginByName(fishCreate.getOrigin()));
        newKoiFish.setIsForSale(true);
        newKoiFish.setDeleted(false);
        koiFishRepository.save(newKoiFish);
        return fishCreate;
    }

    public Integer customerFishConsign(FishForConsignment consignment) {
        KoiFish koiFish = modelMapper.map(consignment, KoiFish.class);
        koiFish.setBreed(breedsService.getBreedByName(consignment.getBreed()));
        koiFish.setOrigin(originService.getOriginByName(consignment.getOrigin()));
        koiFish.setPrice(1.0);
        koiFish.setIsForSale(false);
        koiFish.setDeleted(false);
        koiFishRepository.save(koiFish);
        return koiFish.getKoiID();
    }

    public ViewFish updateKoiFish(Integer id, ViewFish koiFishDetails) {
        KoiFish koiFish = koiFishRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("KoiFish not found for this id :: " + id));
        modelMapper.map(koiFishDetails, koiFish);
        koiFish.setBreed(breedsService.getBreedByName(koiFishDetails.getBreed()));
        koiFish.setOrigin(originService.getOriginByName(koiFishDetails.getOrigin()));
        koiFishRepository.save(koiFish);
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
        if (!koiFish.isDeleted()) {
            return detailsKoiFish(koiFish.getKoiID());
        }else throw new EntityNotFoundException("KoiFish not found for this name :: " + name);
    }

    public List<String> searchKoiFishByName(String name) {
        List<String> koiFishNames = new ArrayList<>();
        for (KoiFish koiFish : koiFishRepository.findAll()) {
            if (koiFish.getFishName().toLowerCase().contains(name.toLowerCase()) && !koiFish.isDeleted()) {
                koiFishNames.add(koiFish.getFishName());
            }
        }
        return koiFishNames;
    }

    public FishResponse getKoiFishesByBreed(String breed, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<KoiFish> koiFishPage = koiFishRepository.findByBreed_BreedNameAndIsForSaleAndDeletedIsFalse(breed, true, pageable);
        List<FishForList> fishList = new ArrayList<>();
        for (KoiFish koiFish : koiFishRepository.findByBreed_BreedNameAndIsForSaleAndDeletedIsFalse(breed, true, pageable)) {
                FishForList fishForList = modelMapper.map(koiFish, FishForList.class);
                fishForList.setBreed(koiFish.getBreed().getBreedName());
                fishForList.setOrigin(koiFish.getOrigin().getOriginName());
                fishList.add(fishForList);
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
        koiFish.setDeleted(true);
        koiFishRepository.save(koiFish);
    }

    public ViewFish getKoiFishById(int id) {
        return detailsKoiFish(id);
    }

    public FishForCart getFishCart(Integer id) {
        KoiFish koiFish = koiFishRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("KoiFish not found for this id :: " + id));
        return modelMapper.map(koiFish, FishForCart.class);
    }

    public String getFishName(Integer id) {
        KoiFish koiFish = koiFishRepository.findKoiFishByKoiID(id);
        return koiFish.getFishName();
    }

    public boolean getIsForSale(Integer koiId) {
        KoiFish koiFish = koiFishRepository.findById(koiId)
                .orElseThrow(() -> new RuntimeException("KoiFish not found for this id :: " + koiId));
        return koiFish.getIsForSale();
    }
}

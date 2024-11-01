package com.koishop.service;

import com.koishop.entity.*;
import com.koishop.repository.BatchRepository;
import com.koishop.repository.BreedsRepository;
import com.koishop.repository.KoiFishRepository;
import com.koishop.repository.OrderDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BreedsService {

    @Autowired
    private BreedsRepository breedsRepository;
    @Autowired
    private OrderDetailsRepository orderDetailsRepository;
    @Autowired
    private KoiFishRepository koiFishRepository;
    @Autowired
    private BatchRepository batchRepository;

    public List<Breeds> getAllBreeds() {
        return breedsRepository.findAllByDeletedIsFalse();
    }

    public List<String> listBreedNames() {
        List<String> list = new ArrayList<>();
        for (Breeds breeds : breedsRepository.findAllByDeletedIsFalse()) {
            list.add(breeds.getBreedName());
        }
        return list;
    }

    public Breeds createBreed(Breeds breed) {
        breed.setDeleted(false);
        return breedsRepository.save(breed);
    }

    public Breeds updateBreed(Integer id, Breeds breedDetails) {
        Breeds breed = breedsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Breed not found for this id :: " + id));

        breed.setBreedName(breedDetails.getBreedName());
        breed.setDescription(breedDetails.getDescription());

        return breedsRepository.save(breed);
    }

    public void deleteBreed(Integer id) {
        Breeds breed = breedsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Breed not found for this id :: " + id));
        try {
            breedsRepository.delete(breed);
        } catch (Exception e) {
            breed.setDeleted(true);
            breedsRepository.save(breed);
        }
    }


    public Breeds getBreedByName(String breed) {
        Breeds breeds = breedsRepository.getBreedsByBreedName(breed);
        if (breeds == null || breeds.isDeleted()) throw new RuntimeException("Breed not found for this name :: " + breed);
        return breeds;
    }

    public List<Object[]> BreedsSold() {
        List<Object[]> breedsSold = new ArrayList<>();
        for (String breedName : listBreedNames()) {
            int totalSold = 0;
            for (OrderDetails orderDetails : orderDetailsRepository.findAll()) {
                if (orderDetails.getOrders().isDeleted()) continue;
                if (!orderDetails.getOrders().getOrderStatus().equals("PAID")) continue;

                if (orderDetails.getProductType() == ProductType.KoiFish) {
                    KoiFish koiFish = koiFishRepository.findKoiFishByKoiID(orderDetails.getProductId());
                    if (koiFish != null && koiFish.getBreed().getBreedName().equals(breedName)) {
                        totalSold += orderDetails.getQuantity();
                    }
                }
                else {
                    Batch batch = batchRepository.findByBatchID(orderDetails.getProductId());
                    if (batch != null && batch.getBreed().getBreedName().equals(breedName)) {
                        totalSold += orderDetails.getQuantity();
                    }
                }
            }

            breedsSold.add(new Object[]{breedName, totalSold});
        }
        breedsSold.sort((o1, o2) -> Integer.compare((Integer) o2[1], (Integer) o1[1]));
        return breedsSold.size() > 5 ? breedsSold.subList(0, 5) : breedsSold;
    }
}

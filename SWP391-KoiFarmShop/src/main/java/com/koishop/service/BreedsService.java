package com.koishop.service;

import com.koishop.entity.Breeds;
import com.koishop.repository.BreedsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BreedsService {

    @Autowired
    private BreedsRepository breedsRepository;

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
        breed.setDeleted(true);
        breedsRepository.save(breed);
    }

    public Breeds getBreedByName(String breed) {
        Breeds breeds = breedsRepository.getBreedsByBreedName(breed);
        if (breeds == null || breeds.isDeleted()) throw new RuntimeException("Breed not found for this name :: " + breed);
        return breeds;
    }
}

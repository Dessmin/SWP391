package com.example.demo.service;

import com.example.demo.entity.Breeds;
import com.example.demo.repository.BreedsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BreedsService {

    @Autowired
    private BreedsRepository breedsRepository;

    public List<Breeds> getAllBreeds() {
        return breedsRepository.findAll();
    }


    public Breeds createBreed(Breeds breed) {
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
        breedsRepository.delete(breed);
    }

    public Breeds getBreedByName(String breed) {
        return breedsRepository.getBreedsByBreedName(breed);
    }
}

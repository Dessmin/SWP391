package com.example.demo.service;

import com.example.demo.entity.Batch;
import com.example.demo.entity.Breeds;
import com.example.demo.repository.BatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BatchService {

    @Autowired
    BatchRepository batchRepository;

    public List<Batch> getAllBatch() {
        return batchRepository.findAll();
    }


    public Batch createBatch(Batch batch) {
        return batchRepository.save(batch);
    }

    public Batch updateBatch(int id, Batch batch) {
        Batch batch1 = batchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Batch not found for this id :: " + id));

//        batch1.setDescription(batch.getDescription());
//        batch1.setStatus(batch.getStatus());
//        batch1.setBreedID(batch.getBreedID());
//        batch1.setPromotionID(batch.getPromotionID());

        return batchRepository.save(batch1);
    }

    public void deleteBatch(int id) {
        Batch batch = batchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Batch not found for this id :: " + id));
        batchRepository.delete(batch);
    }
}

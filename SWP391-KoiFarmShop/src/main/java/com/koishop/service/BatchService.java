package com.koishop.service;

import com.koishop.entity.Batch;
import com.koishop.entity.Breeds;
import com.koishop.models.batch_model.BatchDetailUpdate;
import com.koishop.models.batch_model.BatchResponse;
import com.koishop.models.batch_model.BatchView;
import com.koishop.repository.BatchRepository;
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
public class BatchService {
    @Autowired
    UserService userService;
    @Autowired
    BatchRepository batchRepository;
    @Autowired
    @Lazy
    private ModelMapper modelMapper;
    @Autowired
    private BreedsService breedsService;

    public BatchResponse getAllBatch(int page, int size) {
        List<BatchView> batchViewList = new ArrayList<>();
        for (Batch batches : batchRepository.findAll(PageRequest.of(page, size))) {
            BatchView batch = modelMapper.map(batches, BatchView.class);
            batch.setBreedName(batches.getBreed().getBreedName());
            batchViewList.add(batch);
        }
        BatchResponse batchResponse = new BatchResponse();
        batchResponse.setTotalPages(batchRepository.findAll(PageRequest.of(page, size)).getTotalPages());
        batchResponse.setTotalElements(batchRepository.findAll(PageRequest.of(page, size)).getTotalElements());
        batchResponse.setPage(page);
        batchResponse.setContent(batchViewList);
        return batchResponse;
    }

    public List<BatchView> getBatches() {
        List<BatchView> batchViewList = new ArrayList<>();
        for (Batch batches : batchRepository.findAll()) {
            BatchView batch = modelMapper.map(batches, BatchView.class);
            batch.setBreedName(batches.getBreed().getBreedName());
            batchViewList.add(batch);
        }
        return batchViewList;
    }


    public BatchDetailUpdate createBatch(BatchDetailUpdate batch) {
        Batch newBatch = modelMapper.map(batch, Batch.class);
        newBatch.setBreed(breedsService.getBreedByName(batch.getBreed()));
        newBatch.setManager(userService.getCurrentUser());
        newBatch.setIsSale(true);
        batchRepository.save(newBatch);
        return batch;
    }

    public BatchDetailUpdate detailBatch(int id) {
        Batch batch1 = batchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Batch not found for this id :: " + id));
        BatchDetailUpdate batchDetailUpdate = modelMapper.map(batch1, BatchDetailUpdate.class);
        batchDetailUpdate.setBreed(batch1.getBreed().getBreedName());
        return batchDetailUpdate;
    }

    public boolean updateIsSale(Integer id) {
        Batch batch = batchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Batch not found for this id :: " + id));
        batch.setIsSale(!batch.getIsSale());
        batchRepository.save(batch);
        return batch.getIsSale();
    }

    public BatchDetailUpdate updateBatch(int id, BatchDetailUpdate batch) {
        Batch batch1 = batchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Batch not found for this id :: " + id));
        modelMapper.map(batch, batch1);
        Breeds breeds = breedsService.getBreedByName(batch.getBreed());
        batch1.setBreed(breeds);
        batchRepository.save(batch1);
        return batch;
    }

    public void deleteBatch(int id) {
        Batch batch = batchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Batch not found for this id :: " + id));
        batchRepository.delete(batch);
    }

    public BatchResponse getAllBatchByBreed(String breed, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Batch> batchPage = batchRepository.findByBreed_BreedName(breed, pageable);
        List<BatchView> batchViewList = new ArrayList<>();
        for (Batch batches : batchRepository.findByBreed_BreedName(breed, pageable)) {
            if (batches.getBreed().getBreedName().equals(breed)) {
                BatchView batch = modelMapper.map(batches, BatchView.class);
                batch.setBreedName(batches.getBreed().getBreedName());
                batchViewList.add(batch);
            }
        }
        BatchResponse batchResponse = new BatchResponse();
        batchResponse.setTotalPages(batchPage.getTotalPages());
        batchResponse.setTotalElements(batchPage.getTotalElements());
        batchResponse.setPage(page);
        batchResponse.setContent(batchViewList);
        return batchResponse;
    }

    public String getBreedByBatchId(int batchId) {
        Batch batch = batchRepository.getReferenceById(batchId);
        return batch.getBreed().getBreedName();
    }
}

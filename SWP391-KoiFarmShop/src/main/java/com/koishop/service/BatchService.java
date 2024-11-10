package com.koishop.service;

import com.koishop.entity.Batch;
import com.koishop.entity.Breeds;
import com.koishop.models.batch_model.BatchDetailUpdate;
import com.koishop.models.batch_model.BatchForManager;
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
    BatchRepository batchRepository;
    @Autowired
    @Lazy
    private ModelMapper modelMapper;
    @Autowired
    private BreedsService breedsService;

    public BatchResponse getAllBatch(int page, int size) {
        List<BatchView> batchViewList = new ArrayList<>();
        for (Batch batch : batchRepository.findByIsForSaleAndDeletedIsFalseAndQuantityGreaterThan(true, PageRequest.of(page, size), 5)) {
            BatchView batchView = modelMapper.map(batch, BatchView.class);
            batchView.setBreedName(batch.getBreed().getBreedName());
            batchViewList.add(batchView);
        }
        BatchResponse batchResponse = new BatchResponse();
        batchResponse.setTotalPages(batchRepository.findAll(PageRequest.of(page, size)).getTotalPages());
        batchResponse.setTotalElements(batchRepository.findAll(PageRequest.of(page, size)).getTotalElements());
        batchResponse.setPage(page);
        batchResponse.setContent(batchViewList);
        return batchResponse;
    }

    public List<BatchForManager> getBatches() {
        List<BatchForManager> batchViewList = new ArrayList<>();
        for (Batch batches : batchRepository.findAll()) {
            BatchForManager batch = modelMapper.map(batches, BatchForManager.class);
            batch.setBreedName(batches.getBreed().getBreedName());
            batchViewList.add(batch);
        }
        return batchViewList;
    }


    public BatchDetailUpdate createBatch(BatchDetailUpdate batch) {
        Batch newBatch = modelMapper.map(batch, Batch.class);
        newBatch.setBreed(breedsService.getBreedByName(batch.getBreed()));
        newBatch.setIsForSale(true);
        newBatch.setDeleted(false);
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

    public void updateIsSale(Integer id) {
        Batch batch = batchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Batch not found for this id :: " + id));
        batch.setIsForSale(!batch.getIsForSale());
        batchRepository.save(batch);
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
        try {
            batchRepository.delete(batch);
        }catch (Exception e) {
            batch.setDeleted(true);
            batchRepository.save(batch);
        }
    }

    public BatchResponse getAllBatchByBreed(String breed, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Batch> batchPage = batchRepository.findByBreed_BreedNameAndIsForSaleAndDeletedIsFalseAndQuantityGreaterThan(breed, true, pageable, 5);
        List<BatchView> batchViewList = new ArrayList<>();
        for (Batch batches : batchRepository.findByBreed_BreedNameAndIsForSaleAndDeletedIsFalseAndQuantityGreaterThan(breed, true, pageable, 5)) {
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

    public void quantityBatch(int id, int quantity) {
        Batch batch = batchRepository.findByBatchID(id);
        batch.setQuantity(batch.getQuantity() - quantity);
        batchRepository.save(batch);
    }

    public String getBreedByBatchId(int batchId) {
        Batch batch = batchRepository.getReferenceById(batchId);
        return batch.getBreed().getBreedName();
    }
}

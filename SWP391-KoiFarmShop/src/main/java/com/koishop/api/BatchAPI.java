package com.koishop.api;

import com.koishop.entity.Batch;
import com.koishop.models.batch_model.BatchDetailUpdate;
import com.koishop.models.batch_model.BatchResponse;
import com.koishop.models.batch_model.BatchView;
import com.koishop.service.BatchService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8080/")
@SecurityRequirement(name = "api")
@RestController
@RequestMapping("/api/batches")
public class BatchAPI {

    @Autowired
    private BatchService batchService;

    @GetMapping("/list-batch")
    public BatchResponse getAllBatch(@RequestParam int page) {
        return batchService.getAllBatch(page, 4);
    }

    @GetMapping("/{breed}/list-batch-breed")
    public BatchResponse getAllBatchByBreed(@PathVariable String breed,@RequestParam int page) {
        return batchService.getAllBatchByBreed(breed, page, 4);
    }
    
    @PostMapping("/create-batch")
    public BatchDetailUpdate createBatch(@RequestBody BatchDetailUpdate batch) {
        return batchService.createBatch(batch);
    }

    @GetMapping("/{id}/detail")
    public BatchDetailUpdate getBatchDetail(@PathVariable int id) {
        return batchService.detailBatch(id);
    }

    @GetMapping("/{batchId}/getbreed")
    public String getBreedByBatchId(@PathVariable int batchId) {
        return batchService.getBreedByBatchId(batchId);
    }

    @GetMapping("/getbatches")
    public List<BatchView> getBatches() {
        return batchService.getBatches();
    }

    @PutMapping("/{batchId}/update")
    public BatchDetailUpdate updateBatch(@PathVariable int batchId, @RequestBody BatchDetailUpdate batchDetails) {
        return batchService.updateBatch(batchId, batchDetails);
    }


    @DeleteMapping("/{batchId}")
    public ResponseEntity<Void> deleteBatch(@PathVariable int batchId) {
        batchService.deleteBatch(batchId);
        return ResponseEntity.noContent().build();
    }
}

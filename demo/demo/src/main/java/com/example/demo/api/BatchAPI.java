package com.example.demo.api;

import com.example.demo.entity.Batch;
import com.example.demo.entity.Breeds;
import com.example.demo.service.BatchService;
import com.example.demo.service.BreedsService;
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
    public List<Batch> getAllBatch() {
        return batchService.getAllBatch();
    }

    
    @PostMapping("create-batch")
    public Batch createBatch(@RequestBody Batch batch) {
        return batchService.createBatch(batch);
    }


    @PutMapping("/{batchId}")
    public ResponseEntity<Batch> updateBatch(@PathVariable int batchId, @RequestBody Batch batchDetails) {
        Batch updatedBatch = batchService.updateBatch(batchId, batchDetails);
        return ResponseEntity.ok(updatedBatch);
    }


    @DeleteMapping("/{batchId}")
    public ResponseEntity<Void> deleteBatch(@PathVariable int batchId) {
        batchService.deleteBatch(batchId);
        return ResponseEntity.noContent().build();
    }
}

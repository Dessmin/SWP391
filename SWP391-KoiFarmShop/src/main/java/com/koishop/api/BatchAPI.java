package com.koishop.api;

import com.koishop.models.batch_model.BatchDetailUpdate;
import com.koishop.models.batch_model.BatchForManager;
import com.koishop.models.batch_model.BatchResponse;
import com.koishop.service.BatchService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "https://deploy-fe-kappa.vercel.app"})
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
    @PreAuthorize("hasAuthority('Manager') or hasAuthority('Staff')")
    public BatchDetailUpdate createBatch(@Valid @RequestBody BatchDetailUpdate batch) {
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
    @PreAuthorize("hasAuthority('Manager')")
    public List<BatchForManager> getBatches() {
        return batchService.getBatches();
    }

    @PutMapping("/{batchId}/update-isSale")
    @PreAuthorize("hasAuthority('Manager') or hasAuthority('Staff')")
    public void updateIsSale(@PathVariable int batchId){
        batchService.updateIsSale(batchId);
    }

    @PutMapping("/{batchId}/update")
    @PreAuthorize("hasAuthority('Manager')")
    public BatchDetailUpdate updateBatch(@PathVariable int batchId, @Valid @RequestBody BatchDetailUpdate batchDetails) {
        return batchService.updateBatch(batchId, batchDetails);
    }


    @PutMapping("/{batchId}/delete")
    @PreAuthorize("hasAuthority('Manager')")
    public ResponseEntity<Void> deleteBatch(@PathVariable int batchId) {
        batchService.deleteBatch(batchId);
        return ResponseEntity.noContent().build();
    }
}

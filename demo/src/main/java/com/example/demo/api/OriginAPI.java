package com.example.demo.api;

import com.example.demo.entity.Origin;
import com.example.demo.entity.Payment;
import com.example.demo.service.OriginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/origin")
public class OriginAPI {

    @Autowired
    private OriginService originService;


    @PostMapping("add-origin")
    public Origin createOrigin(@RequestBody Origin origin) {
        return originService.createOrigin(origin);
    }

    // Update payment by ID
    @PutMapping("/{originN}")
    public ResponseEntity<Origin> updateOrigin(@PathVariable String originN, @RequestBody Origin updatedOrigin) {
        try {
            Origin origin = originService.updateOrigin(originN, updatedOrigin);
            return ResponseEntity.ok(origin);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Get all Origins
    @GetMapping("list-origin")
    public List<Origin> getAllOrigins() {
        return originService.getAllOrigins();
    }


    // Delete an Origin
    @DeleteMapping("/{originN}")
    public ResponseEntity<Void> deleteOrigin(@PathVariable String originN) {
        originService.deleteOrigin(originN);
        return ResponseEntity.noContent().build();
    }
}

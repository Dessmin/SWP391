package com.example.demo.api;

import com.example.demo.entity.Origin;
import com.example.demo.service.OriginService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8080/")
@SecurityRequirement(name = "api")
@RestController
@RequestMapping("/api/origin")
public class OriginAPI {

    @Autowired
    private OriginService originService;

    @GetMapping
    public List<Origin> getAllOrigins() {
        return originService.getAllOrigins();
    }

    @GetMapping("/{id}")
    public Origin getOriginById(@PathVariable Integer id) {
        return originService.getOriginById(id);
    }

    @PostMapping
    public Origin createOrigin(@RequestBody Origin origin) {
        return originService.createOrigin(origin);
    }

    @PutMapping("/{id}")
    public Origin updateOrigin(@PathVariable Integer id, @RequestBody Origin origin) {
        return originService.updateOrigin(id, origin);
    }

    @DeleteMapping("/{id}")
    public void deleteOrigin(@PathVariable Integer id) {
        originService.deleteOrigin(id);
    }
}

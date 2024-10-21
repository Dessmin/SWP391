package com.koishop.api;

import com.koishop.entity.Origin;
import com.koishop.service.OriginService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8080/")
@SecurityRequirement(name = "api")
@RestController
@RequestMapping("/api/origin")
public class OriginAPI {

    @Autowired
    private OriginService originService;

    @GetMapping("list")
    public List<Origin> getAllOrigins() {
        return originService.getAllOrigins();
    }

    @GetMapping("list-originName")
    public List<String> getAllOriginNames() {
        return originService.listOriginNames();
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

    @PutMapping("/{id}/delete")
    public void deleteOrigin(@PathVariable Integer id) {
        originService.deleteOrigin(id);
    }
}

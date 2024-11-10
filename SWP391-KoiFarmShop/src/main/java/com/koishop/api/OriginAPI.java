package com.koishop.api;

import com.koishop.entity.Origin;
import com.koishop.service.OriginService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "https://deploy-fe-kappa.vercel.app"})
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
    @PreAuthorize("hasAuthority('Manager') or hasAuthority('Staff')")
    public Origin createOrigin(@Valid @RequestBody Origin origin) {
        return originService.createOrigin(origin);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('Manager')")
    public Origin updateOrigin(@PathVariable Integer id, @Valid @RequestBody Origin origin) {
        return originService.updateOrigin(id, origin);
    }

    @PutMapping("/{id}/delete")
    @PreAuthorize("hasAuthority('Manager')")
    public void deleteOrigin(@PathVariable Integer id) {
        originService.deleteOrigin(id);
    }
}

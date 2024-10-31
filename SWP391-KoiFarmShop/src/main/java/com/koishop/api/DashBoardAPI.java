package com.koishop.api;

import com.koishop.service.DashBoardService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/api/dashboard")
@SecurityRequirement(name = "api")
public class DashBoardAPI {

    @Autowired
    private DashBoardService dashBoardService;

    @GetMapping("/stats")
    public ResponseEntity getStats() {
        Map<String, Object> stats = dashBoardService.getDashboard();
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/income")
    public ResponseEntity getIncome() {
        Map<String, Object> incomed = dashBoardService.income();
        return ResponseEntity.ok(incomed);
    }
}

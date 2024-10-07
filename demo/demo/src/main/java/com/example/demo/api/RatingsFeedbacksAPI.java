package com.example.demo.api;

import com.example.demo.entity.RatingsFeedbacks;
import com.example.demo.service.RatingsFeedbacksService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8080/")
@SecurityRequirement(name = "api")
@RestController
@RequestMapping("/api/ratings-feedbacks")
public class RatingsFeedbacksAPI {
    @Autowired
    private RatingsFeedbacksService ratingsFeedbacksService;

    @GetMapping("list-ratingsfeedbacks")
    public List<RatingsFeedbacks> getAllRatingsFeedbacks() {
        return ratingsFeedbacksService.getAllRatingsFeedbacks();
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<RatingsFeedbacks> getRatingFeedbackById(@PathVariable Long id) {
//        RatingsFeedbacks ratingFeedback = ratingsFeedbacksService.getRatingFeedbackById(id);
//        return ResponseEntity.ok(ratingFeedback);
//    }

    @PostMapping("add-ratingsfeedback")
    public ResponseEntity<RatingsFeedbacks> createRatingFeedback(@RequestBody RatingsFeedbacks ratingFeedback) {
        RatingsFeedbacks createdRatingFeedback = ratingsFeedbacksService.createRatingFeedback(ratingFeedback);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRatingFeedback);
    }

    @PutMapping("/{ratingID}")
    public ResponseEntity<RatingsFeedbacks> updateRatingFeedback(@PathVariable Integer ratingID, @RequestBody RatingsFeedbacks ratingFeedbackDetails) {
        RatingsFeedbacks updatedRatingFeedback = ratingsFeedbacksService.updateRatingFeedback(ratingID, ratingFeedbackDetails);
        return ResponseEntity.ok(updatedRatingFeedback);
    }

    @DeleteMapping("/{ratingID}")
    public ResponseEntity<Void> deleteRatingFeedback(@PathVariable Integer ratingID) {
        ratingsFeedbacksService.deleteRatingFeedback(ratingID);
        return ResponseEntity.noContent().build();
    }
}

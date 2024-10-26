package com.koishop.api;

import com.koishop.entity.RatingsFeedbacks;
import com.koishop.models.ratingsFeedback_model.RFRequest;
import com.koishop.models.ratingsFeedback_model.RFView;
import com.koishop.service.RatingsFeedbacksService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@SecurityRequirement(name = "api")
@RestController
@RequestMapping("/api/ratings-feedbacks")
public class RatingsFeedbacksAPI {
    @Autowired
    private RatingsFeedbacksService ratingsFeedbacksService;

    @GetMapping("/{koiId}/list-ratingsfeedbacksbykoi")
    public List<RFView> getAllRatingsFeedbacksByKoi(@PathVariable Integer koiId) {
        return ratingsFeedbacksService.getAllRatingsFeedbacksByKoiId(koiId);
    }

    @GetMapping("/{userId}/list-ratingsfeedbacksbyuser")
    public List<RFView> getAllRatingsFeedbacksByUser(@PathVariable long userId) {
        return ratingsFeedbacksService.getAllRatingsFeedbacksByUserId(userId);
    }

    @GetMapping("list-ratingsfeedbacks")
    public List<RatingsFeedbacks> getAllRatingsFeedbacks() {
        return ratingsFeedbacksService.getAllRatingsFeedbacks();
    }

    @GetMapping("/{id}")
    public RFView getRatingFeedbackById(@PathVariable Integer id) {
        return ratingsFeedbacksService.getRatingFeedback(id);
    }

    @PostMapping("add-ratingsfeedback")
    public RFView createRatingFeedback(@RequestBody RFRequest ratingFeedback) {
        return ratingsFeedbacksService.createRatingFeedback(ratingFeedback);
    }

    @PutMapping("/{ratingID}")
    public RFView updateRatingFeedback(@PathVariable Integer ratingID, @RequestBody RFRequest ratingFeedbackDetails) {
        return ratingsFeedbacksService.updateRatingFeedback(ratingID, ratingFeedbackDetails);
    }

    @DeleteMapping("/{ratingID}")
    public ResponseEntity<Void> deleteRatingFeedback(@PathVariable Integer ratingID) {
        ratingsFeedbacksService.deleteRatingFeedback(ratingID);
        return ResponseEntity.noContent().build();
    }
}

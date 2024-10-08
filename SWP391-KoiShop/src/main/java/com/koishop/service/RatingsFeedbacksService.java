package com.koishop.service;

import com.koishop.entity.RatingsFeedbacks;
import com.koishop.exception.EntityNotFoundException;
import com.koishop.repository.RatingsFeedbacksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingsFeedbacksService {
    @Autowired
    private RatingsFeedbacksRepository ratingsFeedbacksRepository;

    public List<RatingsFeedbacks> getAllRatingsFeedbacks() {
        return ratingsFeedbacksRepository.findAll();
    }

//    public RatingsFeedbacks getRatingFeedbackById(Long id) {
//        return ratingsFeedbacksRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Rating/Feedback not found"));
//    }

    public RatingsFeedbacks createRatingFeedback(RatingsFeedbacks ratingFeedback) {
        return ratingsFeedbacksRepository.save(ratingFeedback);
    }

    public RatingsFeedbacks updateRatingFeedback(Integer id, RatingsFeedbacks ratingFeedbackDetails) {
        RatingsFeedbacks ratingFeedback = ratingsFeedbacksRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rating/Feedback not found"));

//        ratingFeedback.setUserID(ratingFeedbackDetails.getUserID());
//        ratingFeedback.setKoiID(ratingFeedbackDetails.getKoiID());
//        ratingFeedback.setRating(ratingFeedbackDetails.getRating());
//        ratingFeedback.setFeedback(ratingFeedbackDetails.getFeedback());
//        ratingFeedback.setFeedbackDate(ratingFeedbackDetails.getFeedbackDate());

        return ratingsFeedbacksRepository.save(ratingFeedback);
    }

    public void deleteRatingFeedback(Integer id) {
        RatingsFeedbacks ratingFeedback = ratingsFeedbacksRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rating/Feedback not found"));
        ratingsFeedbacksRepository.delete(ratingFeedback);
    }
}
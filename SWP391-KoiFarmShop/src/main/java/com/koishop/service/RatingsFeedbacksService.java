package com.koishop.service;

import com.koishop.entity.KoiFish;
import com.koishop.entity.RatingsFeedbacks;
import com.koishop.exception.EntityNotFoundException;
import com.koishop.models.ratingsFeedback_model.RFRequest;
import com.koishop.models.ratingsFeedback_model.RFView;
import com.koishop.repository.KoiFishRepository;
import com.koishop.repository.RatingsFeedbacksRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class RatingsFeedbacksService {
    @Autowired
    private RatingsFeedbacksRepository ratingsFeedbacksRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserService userService;
    @Autowired
    private KoiFishRepository koiFishRepository;

    public List<RFView> getAllRatingsFeedbacksByKoiId(Integer koiId) {
        List<RFView> rfViews = new ArrayList<>();
        for (RatingsFeedbacks ratingsFeedback : ratingsFeedbacksRepository.findAll()) {
            if (koiId.equals(ratingsFeedback.getKoiFish().getKoiID())) {
                RFView rfView = modelMapper.map(ratingsFeedback, RFView.class);
                rfView.setUserName(ratingsFeedback.getUser().getUsername());
                rfView.setFishName(ratingsFeedback.getKoiFish().getFishName());
                rfViews.add(rfView);
            }
        }
        return rfViews;
    }

    public List<RFView> getAllRatingsFeedbacksByUserId(long userId) {
        List<RFView> rfViews = new ArrayList<>();
        for (RatingsFeedbacks ratingsFeedback : ratingsFeedbacksRepository.findAll()) {
            if (ratingsFeedback.getUser().getUserId() == userId) {
                RFView rfView = modelMapper.map(ratingsFeedback, RFView.class);
                rfView.setUserName(ratingsFeedback.getUser().getUsername());
                rfView.setFishName(ratingsFeedback.getKoiFish().getFishName());
                rfViews.add(rfView);
            }
        }
        return rfViews;
    }

    public List<RatingsFeedbacks> getAllRatingsFeedbacks() {
        return ratingsFeedbacksRepository.findAll();
    }

    public RFView createRatingFeedback(RFRequest ratingFeedback) {
        RatingsFeedbacks newRatingsFeedback = modelMapper.map(ratingFeedback, RatingsFeedbacks.class);
        KoiFish koiFish = koiFishRepository.findKoiFishByFishName(ratingFeedback.getFishName());
        newRatingsFeedback.setUser(userService.getCurrentUser());
        newRatingsFeedback.setKoiFish(koiFish);
        newRatingsFeedback.setFeedbackDate(new Date());
        ratingsFeedbacksRepository.save(newRatingsFeedback);
        return getRatingFeedback(newRatingsFeedback.getRatingID());
    }

    public RFView updateRatingFeedback(Integer id, RFRequest ratingFeedbackDetails) {
        RatingsFeedbacks ratingFeedback = ratingsFeedbacksRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rating/Feedback not found"));
        modelMapper.map(ratingFeedbackDetails, ratingFeedback);
        KoiFish koiFish = koiFishRepository.findKoiFishByFishName(ratingFeedbackDetails.getFishName());
        ratingFeedback.setKoiFish(koiFish);
        ratingsFeedbacksRepository.save(ratingFeedback);
        return getRatingFeedback(id);
    }

    public RFView getRatingFeedback(Integer id) {
        RatingsFeedbacks ratingFeedback = ratingsFeedbacksRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rating/Feedback not found"));
        RFView rfView = modelMapper.map(ratingFeedback, RFView.class);
        rfView.setFishName(ratingFeedback.getKoiFish().getFishName());
        rfView.setUserName(ratingFeedback.getUser().getUsername());
        return rfView;
    }

    public void deleteRatingFeedback(Integer id) {
        RatingsFeedbacks ratingFeedback = ratingsFeedbacksRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rating/Feedback not found"));
        ratingsFeedbacksRepository.delete(ratingFeedback);
    }
}

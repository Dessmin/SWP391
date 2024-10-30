package com.koishop.service;

import com.koishop.entity.KoiFish;
import com.koishop.entity.RatingsFeedbacks;
import com.koishop.exception.EntityNotFoundException;
import com.koishop.models.ratingsFeedback_model.RFRequest;
import com.koishop.models.ratingsFeedback_model.RFView;
import com.koishop.repository.KoiFishRepository;
import com.koishop.repository.OrdersRepository;
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
    private OrdersRepository ordersRepository;

    public List<RFView> getAllRatingsFeedbacksByUserId(long userId) {
        List<RFView> rfViews = new ArrayList<>();
        for (RatingsFeedbacks ratingsFeedback : ratingsFeedbacksRepository.findAll()) {
            if (ratingsFeedback.getUser().getUserId() == userId) {
                RFView rfView = modelMapper.map(ratingsFeedback, RFView.class);
                rfView.setOrdersId(ratingsFeedback.getOrders().getOrderID());
                rfView.setUserName(ratingsFeedback.getUser().getUsername());
                rfViews.add(rfView);
            }
        }
        return rfViews;
    }

    public List<RFView> getAllRatingsFeedbacks() {
        List<RFView> rfViews = new ArrayList<>();
        for (RatingsFeedbacks ratingsFeedback : ratingsFeedbacksRepository.findAll()) {
            RFView rfView = modelMapper.map(ratingsFeedback, RFView.class);
            rfView.setOrdersId(ratingsFeedback.getOrders().getOrderID());
            rfView.setUserName(ratingsFeedback.getUser().getUsername());
            rfViews.add(rfView);
        }
        return rfViews;
    }

    public RFView createRatingFeedback(RFRequest ratingFeedback) {
        RatingsFeedbacks newRatingsFeedback = modelMapper.map(ratingFeedback, RatingsFeedbacks.class);
        newRatingsFeedback.setOrders(ordersRepository.findByOrderID(ratingFeedback.getOrdersId()));
        newRatingsFeedback.setUser(userService.getCurrentUser());
        newRatingsFeedback.setFeedbackDate(new Date());
        ratingsFeedbacksRepository.save(newRatingsFeedback);
        return getRatingFeedback(newRatingsFeedback.getRatingID());
    }

    public RFView getRatingFeedback(Integer id) {
        RatingsFeedbacks ratingFeedback = ratingsFeedbacksRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rating/Feedback not found"));
        RFView rfView = modelMapper.map(ratingFeedback, RFView.class);
        rfView.setOrdersId(ratingFeedback.getOrders().getOrderID());
        rfView.setUserName(ratingFeedback.getUser().getUsername());
        return rfView;
    }

    public void deleteRatingFeedback(Integer id) {
        RatingsFeedbacks ratingFeedback = ratingsFeedbacksRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rating/Feedback not found"));
        ratingsFeedbacksRepository.delete(ratingFeedback);
    }
}

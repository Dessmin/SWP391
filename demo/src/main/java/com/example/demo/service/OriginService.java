package com.example.demo.service;

import com.example.demo.entity.Origin;
import com.example.demo.entity.Payment;
import com.example.demo.repository.OriginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OriginService {

    @Autowired
    private OriginRepository originRepository;

    public Origin createOrigin(Origin origin) {
        return originRepository.save(origin);
    }

    public Origin updateOrigin(String id, Origin updatedOrigin) {
        return originRepository.findById(id)
                .map(origin -> {
                    origin.setDescription(updatedOrigin.getDescription());
                    return originRepository.save(origin);
                })
                .orElseThrow(() -> new RuntimeException("Payment not found with id " + id));
    }

    // Read all Origins
    public List<Origin> getAllOrigins() {
        return originRepository.findAll();
    }


    // Delete an Origin
    public void deleteOrigin(String originN) {
        originRepository.deleteById(originN);
    }
}

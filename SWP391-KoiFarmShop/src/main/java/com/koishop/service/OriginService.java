package com.koishop.service;

import com.koishop.entity.Origin;
import com.koishop.repository.OriginRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OriginService {

    @Autowired
    private OriginRepository originRepository;

    public List<Origin> getAllOrigins() {
        return originRepository.findAllByDeletedIsFalse();
    }

    public List<String> listOriginNames() {
        List<String> list = new ArrayList<>();
        for (Origin origin : originRepository.findAllByDeletedIsFalse()) {
            list.add(origin.getOriginName());
        }
        return list;
    }

    public Origin getOriginById(Integer id) {
        return originRepository.findById(id).orElse(null);
    }

    public Origin createOrigin(Origin origin) {
        origin.setDeleted(false);
        return originRepository.save(origin);
    }

    public Origin updateOrigin(Integer id, Origin origin) {
        Origin existingOrigin = getOriginById(id);
        if (existingOrigin != null) {
            existingOrigin.setOriginName(origin.getOriginName());
            existingOrigin.setType(origin.getType());
            existingOrigin.setDescription(origin.getDescription());
            return originRepository.save(existingOrigin);
        } else {
            return null;
        }
    }

    public void deleteOrigin(Integer id) {
        Origin existingOrigin = getOriginById(id);
        existingOrigin.setDeleted(true);
        originRepository.save(existingOrigin);
    }

    public Origin getOriginByName(String origin) {
        Origin existingOrigin = originRepository.getOriginByOriginName(origin);
        if (existingOrigin != null && !existingOrigin.isDeleted()) {
            return existingOrigin;
        }else throw new EntityNotFoundException("Origin not found");
    }
}

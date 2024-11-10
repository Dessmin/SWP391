package com.koishop.service;

import com.koishop.entity.Posting;
import com.koishop.exception.EntityNotFoundException;
import com.koishop.models.posting_model.PostingForList;
import com.koishop.models.posting_model.PostingForAdmin;
import com.koishop.models.posting_model.PostingRequest;
import com.koishop.repository.PostingRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostingService {

    @Autowired
    private PostingRepository postingRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserService userService;

    public PostingForAdmin getPosting(int id) {
        Posting posting = postingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Posting not found!"));
        PostingForAdmin postingForAdmin = modelMapper.map(posting, PostingForAdmin.class);
        postingForAdmin.setAuthor(posting.getAuthor().getUsername());
        return postingForAdmin;
    }

    public PostingForAdmin addPosting(PostingRequest postingAdd) {
        Posting posting = modelMapper.map(postingAdd, Posting.class);
        posting.setDate(new Date());
        posting.setAuthor(userService.getCurrentUser());
        postingRepository.save(posting);
        return modelMapper.map(posting, PostingForAdmin.class);
    }

    public PostingForAdmin updatePosting(int id, PostingRequest postingUpdate) {
        Posting posting = postingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Posting not found!"));
        posting.setTitle(postingUpdate.getTitle());
        posting.setContent(postingUpdate.getContent());
        posting.setImage(postingUpdate.getImage());
        postingRepository.save(posting);
        return modelMapper.map(posting, PostingForAdmin.class);
    }

    public void deletePosting(int id) {
        Posting posting = postingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Posting not found!"));
        postingRepository.delete(posting);
    }

    public List<PostingForList> getAllPostings() {
        return postingRepository.findAll().stream()
                .map(posting -> modelMapper.map(posting, PostingForList.class))
                .collect(Collectors.toList());
    }
}

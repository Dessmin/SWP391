package com.koishop.api;

import com.koishop.models.posting_model.PostingForList;
import com.koishop.models.posting_model.PostingForAdmin;
import com.koishop.models.posting_model.PostingRequest;
import com.koishop.service.PostingService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@SecurityRequirement(name = "api")
@RestController
@RequestMapping("/api/posting")
public class PostingAPI {

    @Autowired
    private PostingService postingService;

    @GetMapping("/list-postings")
    public List<PostingForList> getAllPostings() {
        return postingService.getAllPostings();
    }

    @GetMapping("/{id}/get-posting")
    public PostingForAdmin getPosting(@PathVariable int id) {
        return postingService.getPosting(id);
    }

    @PostMapping("/add-posting")
    public PostingForAdmin addPosting(@RequestBody PostingRequest postingAdd) {
        return postingService.addPosting(postingAdd);
    }

    @PutMapping("/{id}/update-posting")
    public PostingForAdmin updatePosting(@PathVariable int id, @RequestBody PostingRequest postingUpdate) {
        return postingService.updatePosting(id, postingUpdate);
    }

    @DeleteMapping("/{id}/delete-posting")
    public ResponseEntity<Void> deletePosting(@PathVariable int id) {
        postingService.deletePosting(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

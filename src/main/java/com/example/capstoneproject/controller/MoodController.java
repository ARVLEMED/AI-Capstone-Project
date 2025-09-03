package com.example.capstoneproject.controller;

import com.example.capstoneproject.model.Mood;
import com.example.capstoneproject.service.MoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mood")
public class MoodController {
    
    @Autowired
    private MoodService moodService;
    
    @PostMapping
    public ResponseEntity<Mood> logMood(@RequestBody MoodRequest request) {
        try {
            Mood mood = moodService.logMood(request.getRating(), request.getNote());
            return ResponseEntity.ok(mood);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/today")
    public ResponseEntity<Mood> getTodaysMood() {
        Mood mood = moodService.getTodaysMood();
        return mood != null ? ResponseEntity.ok(mood) : ResponseEntity.notFound().build();
    }
    
    @GetMapping("/history")
    public List<Mood> getMoodHistory(@RequestParam(defaultValue = "30") int days) {
        return moodService.getMoodHistory(days);
    }
    
    @GetMapping("/stats")
    public Map<String, Object> getMoodStats() {
        return moodService.getMoodStats();
    }
    
    // Helper class for request body
    public static class MoodRequest {
        private Integer rating;
        private String note;
        
        public Integer getRating() { return rating; }
        public void setRating(Integer rating) { this.rating = rating; }
        
        public String getNote() { return note; }
        public void setNote(String note) { this.note = note; }
    }
}


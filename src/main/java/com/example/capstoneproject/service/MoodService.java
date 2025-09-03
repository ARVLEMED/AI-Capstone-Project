package com.example.capstoneproject.service;

import com.example.capstoneproject.model.Mood;
import com.example.capstoneproject.repository.MoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class MoodService {
    
    @Autowired
    private MoodRepository moodRepository;
    
    public Mood logMood(Integer rating, String note) {
        if (rating < 1 || rating > 10) {
            throw new IllegalArgumentException("Rating must be between 1 and 10");
        }
        
        LocalDate today = LocalDate.now();
        Mood mood = moodRepository.findByDate(today)
                .orElse(new Mood(today, rating, note));
        
        mood.setRating(rating);
        mood.setNote(note);
        
        return moodRepository.save(mood);
    }
    
    public List<Mood> getMoodHistory(int days) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(days - 1);
        return moodRepository.findByDateBetweenOrderByDateDesc(startDate, endDate);
    }
    
    public Map<String, Object> getMoodStats() {
        Map<String, Object> stats = new HashMap<>();
        LocalDate thirtyDaysAgo = LocalDate.now().minusDays(30);
        
        Double avgRating = moodRepository.findAverageRatingBetweenDates(thirtyDaysAgo, LocalDate.now());
        Long goodDays = moodRepository.countGoodMoodDaysSince(thirtyDaysAgo);
        
        stats.put("averageRating", avgRating != null ? Math.round(avgRating * 100.0) / 100.0 : 0);
        stats.put("goodDaysCount", goodDays);
        stats.put("period", "Last 30 days");
        
        return stats;
    }
    
    public Mood getTodaysMood() {
        return moodRepository.findByDate(LocalDate.now()).orElse(null);
    }
}

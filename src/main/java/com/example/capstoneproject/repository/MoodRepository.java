package com.example.capstoneproject.repository;

import com.example.capstoneproject.model.Mood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MoodRepository extends JpaRepository<Mood, Long> {
    Optional<Mood> findByDate(LocalDate date);
    List<Mood> findByDateBetweenOrderByDateDesc(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT AVG(m.rating) FROM Mood m WHERE m.date BETWEEN ?1 AND ?2")
    Double findAverageRatingBetweenDates(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT COUNT(m) FROM Mood m WHERE m.rating >= 7 AND m.date >= ?1")
    Long countGoodMoodDaysSince(LocalDate date);
}

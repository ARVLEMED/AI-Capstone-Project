package com.example.capstoneproject.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "moods")
public class Mood {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private LocalDate date;
    
    @Column(nullable = false)
    private Integer rating; 
    
    private String note;
    
    // Constructors
    public Mood() {}
    
    public Mood(LocalDate date, Integer rating, String note) {
        this.date = date;
        this.rating = rating;
        this.note = note;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    
    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
}
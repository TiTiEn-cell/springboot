package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private String category;
    private String publisher;
    private Integer publishedYear;
    private Integer quantity;
    private String description;
    private String imageUrl;
}

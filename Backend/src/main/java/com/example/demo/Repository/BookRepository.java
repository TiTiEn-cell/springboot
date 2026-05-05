package com.example.demo.Repository;

import com.example.demo.Entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByTitleContainingOrAuthorContainingOrCategoryContaining(
            String title, String author, String category
    );
}

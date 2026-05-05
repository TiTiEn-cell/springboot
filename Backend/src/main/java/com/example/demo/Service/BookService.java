package com.example.demo.Service;

import com.example.demo.Entity.Book;
import com.example.demo.Repository.BookRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookService {

    private final BookRepository repo;

    public BookService(BookRepository repo) {
        this.repo = repo;
    }

    public List<Book> getAll() {
        return repo.findAll();
    }

    public Book getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Book create(Book book) {
        return repo.save(book);
    }

    public Book update(Long id, Book newBook) {
        Book book = repo.findById(id).orElseThrow();
        book.setTitle(newBook.getTitle());
        book.setAuthor(newBook.getAuthor());
        book.setCategory(newBook.getCategory());
        book.setPublisher(newBook.getPublisher());
        book.setPublishedYear(newBook.getPublishedYear());
        book.setQuantity(newBook.getQuantity());
        book.setDescription(newBook.getDescription());
        book.setImageUrl(newBook.getImageUrl());
        return repo.save(book);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Book> search(String keyword) {
        return repo.findByTitleContainingOrAuthorContainingOrCategoryContaining(
                keyword, keyword, keyword
        );
    }
}

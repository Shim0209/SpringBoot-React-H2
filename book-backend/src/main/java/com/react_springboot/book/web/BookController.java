package com.react_springboot.book.web;

import com.react_springboot.book.domain.Book;
import com.react_springboot.book.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin // 임시방편 => 시큐리티 적용시 사용못함
public class BookController {

    private final BookService bookService;

    // security(라이브러리 적용) - CORS 정책을 가지고 있음. (따라서 시큐리티의 CORS를 해제시켜야함)
    // BookController 진입 직전
    @PostMapping("/book")
    public ResponseEntity<?> save(@RequestBody Book book){ //@RequestBody를 걸면 Json으로 받는다.
        return new ResponseEntity<>(bookService.저장하기(book), HttpStatus.CREATED); // 201
    }

    @GetMapping("/book")
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(bookService.모두가져오기(), HttpStatus.OK); // 200
    }

    @GetMapping("/book/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        return new ResponseEntity<>(bookService.한건가져오기(id), HttpStatus.OK); // 200
    }

    @PutMapping("/book/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Book book){
        return new ResponseEntity<>(bookService.수정하기(id, book), HttpStatus.OK); // 200
    }

    @DeleteMapping("/book/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        return new ResponseEntity<>(bookService.삭제하기(id), HttpStatus.OK); // 200
    }
}

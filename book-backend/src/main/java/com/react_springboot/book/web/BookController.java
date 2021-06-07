package com.react_springboot.book.web;

import com.react_springboot.book.domain.Book;
import com.react_springboot.book.domain.BookSaveDto;
import com.react_springboot.book.domain.BookUpdateDto;
import com.react_springboot.book.domain.CommonDto;
import com.react_springboot.book.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin // 임시방편 => 시큐리티 적용시 사용못함
public class BookController {

    private final BookService bookService;

    // security(라이브러리 적용) - CORS 정책을 가지고 있음. (따라서 시큐리티의 CORS를 해제시켜야함)
    // BookController 진입 직전
    @PostMapping("/book")
    public CommonDto<?> save(@Valid @RequestBody BookSaveDto dto, BindingResult bindingResult){ //@RequestBody를 걸면 Json으로 받는다.
        Book book = new Book(dto.getTitle(), dto.getAuthor());
        bookService.저장하기(book);
        return new CommonDto<>(HttpStatus.CREATED.value(), "ok");
    }

    @GetMapping("/book")
    public CommonDto<List<Book>> findAll(){
        return new CommonDto<>(HttpStatus.OK.value(), bookService.모두가져오기());
    }

    @GetMapping("/book/{id}")
    public CommonDto<Book> findById(@PathVariable Long id){
        return new CommonDto<>(HttpStatus.OK.value(), bookService.한건가져오기(id));
    }

    @PutMapping("/book/{id}")
    public CommonDto<?> update(@PathVariable Long id,@Valid @RequestBody BookUpdateDto dto, BindingResult bindingResult){
        Book book = new Book(dto.getTitle(), dto.getAuthor());
        bookService.수정하기(id, book);
        return new CommonDto(HttpStatus.OK.value(), "ok");
    }

    @DeleteMapping("/book/{id}")
    public CommonDto deleteById(@PathVariable Long id){
        bookService.삭제하기(id);
        return new CommonDto(HttpStatus.OK.value());
    }
}

package com.react_springboot.book.domain;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class BookUpdateDto {

    @NotBlank(message = "수정할 도서 제목을 입력하세요.")
    @Pattern(regexp = "^[a-zA-Z가-힣0-9\\s]*$", message = "도서 제목에 특수문자를 입력할 수 없습니다.")
    private String title;

    @NotBlank(message = "수정할 도서 저자를 입력하세요.")
    @Pattern(regexp = "^[a-zA-Z가-힣0-9\\s]*$", message = "도서 저자에 특수문자를 입력할 수 없습니다.")
    private String author;
}

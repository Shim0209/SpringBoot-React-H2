package com.react_springboot.book.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity // 서버 실행시에 테이블이 h2에 생성됨. (ORM 시작됨)
public class Book {

    @Id // PK를 해당 변수로 하겠다는 뜻
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 해당 데이터비이스 번호증가 전략을 따라가겠다.
    private Long id; // wrapping클래스로 한 이유는 null을 넣을 수 있기 때문이다.

    private String title;
    private String author;

    public Book(String title, String author) {
        this.title = title;
        this.author = author;
    }

    //    // 아름다운 코딩 형태
//    // @Getter만 생성, @Setter는 만들지 않는다.
//    // 함수를 통해서 set해준다.
//    public static setBook(Dto dto){
//        title=dto.title;
//        author=dto.author;
//    }
}

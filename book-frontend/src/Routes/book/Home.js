import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BookItem from '../../Components/BookItem';

const StyledContainerDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
`;

const Home = () => {

    const [books, setBooks] = useState([]);

    // 함수 실행시 최초 한번 실행되는 것
    useEffect(()=>{
        // 비동기 함수. 
        // 첫번째 then()은 빈 상태를 주고, 요청 데이터를 받아오면 두번째 then()에서 빈 상태속에 값을 넣어준다.
        // 첫번째 then(응답이오면 json으로 바꿔준다.), 두번째 then(값을 받아옴)
        fetch("http://localhost:8080/book").then(res=>res.json()).then(res=>{
            if(res.statusCode === 200){
                setBooks(res.data);
            }
        }); 
    }, [])

    return (
        <StyledContainerDiv>
            {books.map(book => 
                <BookItem key={book.id} book={book} />
            )}
        </StyledContainerDiv>
    );
};

export default Home;
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const StyledContainerDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;
const StyledForm = styled.form`
    border: 1px solid tomato;
    border-radius: 5px;
    padding: 30px 50px;
`;
const StyledFormTitleDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    font-size: 25px;
`;
const StyledFormItemDiv = styled.div`
    margin-bottom: 20px;
`;
const StyledFormInput = styled.input`
    border: 1px solid gray;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 5px;
`;
const StyledFormItemTitleDiv = styled.div`
    margin-bottom: 5px;
`;
const StyledFormItemInfoDiv = styled.div`
    color: red;
    margin-bottom: 5px;
    font-size: 10px;
`;
const StyledFormBtn = styled.button`
    color: tomato;   
    background-color: white;
    padding: 5px 10px;
    border: 1px solid tomato;
    border-radius: 5px;
    &:hover {
        border: 1px solid white;
        color: white;   
        background-color: tomato;
    }
`;


const SaveForm = () => {
    const {push} = useHistory();

    const [book, setBook] = useState({
        title:"",
        author:"",
    });

    const [message, setMessage] = useState({
        title:"",
        author:"",
    });

    const changeValue = (e) => {
        setBook({
            ...book,
            [e.target.name] : e.target.value
        });
    }

    const submitBook = (e) => {
        e.preventDefault(); // submit이 action을 안타고 자기 할일을 멈춤.
        fetch("http://localhost:8080/book", {
            method:"POST",
            headers:{
                "Content-Type":"application/json; charset=utf-8"
            },
            body:JSON.stringify(book)
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.statusCode == 201){
                push("/")
            } else {
                setMessage(res.data)
            }
        });
    }


    return (
        <StyledContainerDiv>
            <StyledForm onSubmit={submitBook}>
                <StyledFormTitleDiv>
                    도서 등록
                </StyledFormTitleDiv>
                <StyledFormItemDiv>
                    <StyledFormItemTitleDiv>Title</StyledFormItemTitleDiv>
                    <StyledFormInput type="text" placeholder="도서 제목 입력란" onChange={changeValue} name="title"></StyledFormInput>
                    <StyledFormItemInfoDiv>{message.title}</StyledFormItemInfoDiv>
                </StyledFormItemDiv>
                <StyledFormItemDiv>
                    <StyledFormItemTitleDiv>Author</StyledFormItemTitleDiv>
                    <StyledFormInput type="text" placeholder="도서 작가 입력란" onChange={changeValue} name="author"></StyledFormInput>
                    <StyledFormItemInfoDiv>{message.author}</StyledFormItemInfoDiv>
                </StyledFormItemDiv>
                <StyledFormBtn type="submit">
                    등록
                </StyledFormBtn>
            </StyledForm>
        </StyledContainerDiv>
    );
};

export default SaveForm;
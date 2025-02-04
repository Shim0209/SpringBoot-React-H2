import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router';

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
const StyledFormBtnContainerDiv = styled.div`
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

const UpdateForm = () => {
    const {id} = useParams();
    const {push} = useHistory();

    const [book, setBook] = useState({
        id:"",
        title:"",
        author:"",
    });

    const [message, setMessage] = useState({
        title:"",
        author:"",
    })

    useEffect(()=>{
        fetch(`http://localhost:8080/book/${id}`).then(res=>res.json()).then(res=>{
            if(res.statusCode === 200) {
                setBook(res.data)
            }
        }); 
    }, [])

    const changeValue = (e) => {
        setBook({
            ...book,
            [e.target.name] : e.target.value
        });
    }

    const updateBook = (e) => {
        e.preventDefault(); 
        fetch(`http://localhost:8080/book/${id}`, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json; charset=utf-8"
            },
            body:JSON.stringify(book)
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.statusCode === 200){
                push("/")
            } else {
                setMessage(res.data)
            }
        }); 
    }

    const deleteBook = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/book/${id}`, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json; charset=utf-8"
            }
        })
        .then(res=>res.json())
        .then(res=>{
            console.log('delete',res);
            if(res.statusCode === 200){
                push("/");
            } else {
                alert("책 삭제에 실패하였습니다.");
            }
        }); 
    }

    return (
        <StyledContainerDiv>
            <StyledForm onSubmit={updateBook}>
                <StyledFormTitleDiv>
                    도서 수정
                </StyledFormTitleDiv>
                <StyledFormItemDiv>
                    <StyledFormItemTitleDiv>Title</StyledFormItemTitleDiv>
                    <StyledFormInput type="text" value={book.title} onChange={changeValue} name="title"></StyledFormInput>
                    <StyledFormItemInfoDiv>{message.title}</StyledFormItemInfoDiv>
                </StyledFormItemDiv>
                <StyledFormItemDiv>
                    <StyledFormItemTitleDiv>Author</StyledFormItemTitleDiv>
                    <StyledFormInput type="text" value={book.author} onChange={changeValue} name="author"></StyledFormInput>
                    <StyledFormItemInfoDiv>{message.author}</StyledFormItemInfoDiv>
                </StyledFormItemDiv>
                <StyledFormBtnContainerDiv>
                    <StyledFormBtn type="submit">
                        수정
                    </StyledFormBtn>
                    <StyledFormBtn onClick={deleteBook}>
                        삭제
                    </StyledFormBtn>
                </StyledFormBtnContainerDiv>
               
            </StyledForm>
        </StyledContainerDiv>
    );
};

export default UpdateForm;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const Detail = () => {
    const {id} = useParams(); // props.match.params.id 
    const [book, setBook] = useState({
        id:"",
        title:"",
        author:""
    });

    useEffect(()=>{
        fetch(`http://localhost:8080/book/${id}`).then(res=>res.json()).then(res=>{
            if(res.statusCode === 200) {
                setBook(res.data)
            }
        }); 
    }, [])

    return (
        <div>
            <h1>책 ID : {book.id}</h1>
            <h1>책 제목 : {book.title}</h1>
            <h1>책 저자 : {book.author}</h1>
            <Link to={`/updateForm/${book.id}`}>
                <button>수정</button>
            </Link>
        </div>
    );
};

export default Detail;
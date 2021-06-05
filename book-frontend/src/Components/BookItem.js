import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledItemDiv = styled.div`
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 3px 1px black;
`;
const StyledTitleDiv = styled.div`
    font-size: 20px;
`;

const BookItem = ({book}) => (
    <Link to={`/book/${book.id}`}>
        <StyledItemDiv>
            <StyledTitleDiv>{book.title} | {book.author}</StyledTitleDiv>
        </StyledItemDiv>
    </Link>
);

export default BookItem;
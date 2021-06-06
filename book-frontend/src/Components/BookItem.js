import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledItemDiv = styled.div`
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid tomato;
`;
const StyledTitleDiv = styled.div`
    font-size: 20px;
`;

const BookItem = ({book}) => (
    <Link to={`/book/${book.id}`}>
        <StyledItemDiv>
            <StyledTitleDiv>{book.title}</StyledTitleDiv>
        </StyledItemDiv>
    </Link>
);

export default BookItem;
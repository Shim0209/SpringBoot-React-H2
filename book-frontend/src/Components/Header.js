import React from 'react';
import { Link, withRouter } from "react-router-dom";
import styled from 'styled-components';

const StyledHeaderDiv = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    display: flex;
    background-color: white;
`;

const StyledNavTitleDiv = styled.div`
    font-size: 30px;
    font-weight: 600;
    margin: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledNavListUl = styled.ul`
    display: flex;
`;

const StyledNavItemLi = styled.li`
    margin-right: 10px;
    padding: 5px;
    border-radius: 10px;
    border-bottom: 2px solid ${props => props.current ? "tomato" : "transparent"};
`;

const StyledLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px;
`;

export default withRouter(({location:{pathname}})=>(
    <StyledHeaderDiv>
        <StyledNavTitleDiv>
            <Link to="/">
                Book
            </Link>
        </StyledNavTitleDiv>
        <StyledNavListUl>
            <StyledNavItemLi current={pathname === "/"}>
                <StyledLink to="/">Home</StyledLink>
            </StyledNavItemLi>
            <StyledNavItemLi current={pathname === "/saveForm"}>
                <StyledLink to="/saveForm">Save</StyledLink>
            </StyledNavItemLi>
            <StyledNavItemLi current={pathname === "/loginForm"}>
                <StyledLink to="/loginForm">Login</StyledLink>
            </StyledNavItemLi>
            <StyledNavItemLi current={pathname === "/joinForm"}>
                <StyledLink to="/joinForm">Sign</StyledLink>
            </StyledNavItemLi>
        </StyledNavListUl>
    </StyledHeaderDiv>
));
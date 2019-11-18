import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return(
            <NavBarContainer>
                <LogoHeading>Bunnie's Tool Box</LogoHeading>
                <LinkContainer>
                    <StyledLink to="/">Simple</StyledLink>
                    <StyledLink to="/advanced">Advanced</StyledLink>
                    <StyledLink to="/checker">Checker</StyledLink>
                </LinkContainer>
            </NavBarContainer>
        )
    }
}

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-size: 14px;
`
const Simple = styled.button`
    color: white;
    /* width: 150px;
    height: 40px; */
    /* border-radius: 8px; */
    /* border: none; */
    /* outline: none; */
    font-size: 12px;
    text-decoration: none;
`
const NavBarContainer = styled.div`
    width: 100%;
    height: 75px;
    background-color: #64B9CC;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`

const LogoHeading = styled.div`
    font-size: 28px;
    color: white;
    /* margin-left: 150px; */
    font-weight: bold;
`
const LinkContainer = styled.div`
    width: 350px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`
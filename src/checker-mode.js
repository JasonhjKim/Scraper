import React, { Component } from 'react';
import styled from 'styled-components';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class CheckerMode extends Component {
    state = {
        data: {},
    }

    handleSubmit(e) {
        e.preventDefault(); 
        axios.post('http://159.65.69.12:5000/', { "text": e.target[0].value }, { config: {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }}})
            .then(result => {
                console.log(result);
                this.setState({ data: result.data.data }, () => console.log(this.state.data))
            })

            .catch(err => {
                console.log(err);
            })

    }

    render() {
        return(
            <Body>
                <NavBar/>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Label>Copy + Paste Links Here: </Label>
                    <TextArea name="" id="" cols="30" rows="10" required></TextArea>
                    <SubmitButton type="submit" value="Hit it" />
                </Form>

                { this.state.data.length > 0 ?
                <ResultContainer>
                    <Label>{`Found Links (${this.state.data.length}):`}</Label>
                    <StyledTable style={{ width: "1000px"}} fixedHeader={true}>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell> Product URL</TableCell>
                                <TableCell> Status </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                 this.state.data.map((item, index) => 
                                 <TableRow style={{ width: "300px"}}>
                                     <TableCell>{index}</TableCell>
                                     <TableCell> {item.url}</TableCell>
                                     <TableCell align="center"> { item.status ? <StatusTrue/> : <StatusFalse/>}</TableCell>
                                 </TableRow>
                            )}
                        </TableBody>
                    </StyledTable>

                </ResultContainer> : null }
            </Body>
        )
    }
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    color: #64B9CC;
    font-size: 24px;
    font-weight: bold;
    margin: 1em 0 1em 0;
`

const SubmitButton = styled.input`
    width: 343px;
    height: 58px;
    color: white;
    background-color: #6485CC;
    font-size: 24px;
    font-weight: bold;
    border-radius: 8px;
    align-self: center;
    margin: 1em;
`

const TextArea = styled.textarea`
    width: 550px;
    height: 280px;
    border-radius: 4px;
`


const Body = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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


const Simple = styled.button`
    color: white;
    background-color: #cc7764;
    width: 150px;
    height: 40px;
    border-radius: 8px;
    border: none;
    outline: none;
    font-size: 14px;
    text-decoration: none;
`

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 6em;
`

const StyledTable = styled(Table)`
    width: 550px;
    height: 280px;
`
const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
`

const StatuTruesWrapper = styled.div`
    font-size: 16px;
    color: #56EA38;
`

const StatusFalseWrapper = styled.div`
    font-size: 16px;
    color: gray;
`

const StatusTrue = () => {
    return(
        <StatuTruesWrapper>
            ONLINE
        </StatuTruesWrapper>
    )
}

const StatusFalse = () => {
    return(
        <StatusFalseWrapper>
            SHUTDOWN
        </StatusFalseWrapper>
    )
}


const NavBar = () => {
    return(
        <NavBarContainer>
            <LogoHeading>Bunnie's Tool Box</LogoHeading>
            <Simple><StyledLink to="/">Simple Mode</StyledLink></Simple>
            <Simple><StyledLink to="/advanced">Advanced Mode</StyledLink></Simple>
        </NavBarContainer>
    )
}

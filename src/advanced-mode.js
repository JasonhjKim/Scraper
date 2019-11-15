import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

import { FormGroup, FormControlLabel, Checkbox, TableRow, Table, TableBody, TableHead, TableCell } from '@material-ui/core';

const Body = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: hidden;
`

const Container = styled.div`
    width: 1024px;
    /* border: 1px solid black; */
    /* height: 850px; */
    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
    overflow-y: hidden;
    justify-content: center;
`
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
    align-self: flex-start;
    margin: 1em 1em 1em 0;
`

const TextArea = styled.textarea`
    width: 700px;
    height: 400px;
    border-radius: 4px;
`   

const FormWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const Image = styled.img`
    max-width: 100px;
    max-height: 100px;
    object-fit: cover;
`

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 6em;
    width: 100%;
    overflow-x: auto;
`

const StyledTable = styled(Table)`
    max-width: 100%;
    /* width: 900px; */
`

export default class AdvancedMode extends Component {
    state = {
        itemList: [],
        links: "",
        headings: [],
    }
    handleSubmit(e) {
        e.preventDefault();
        this.parseData(e.target[0].value)
    }


    parseData(raw) {
        const firstIndex = raw.indexOf("window.pageData=") + 16;
        const lastIndex = raw.indexOf("}</script>") + 1;
        console.log("first: ", firstIndex, raw[firstIndex + 16]);
        console.log("last: ", lastIndex, raw[lastIndex]);

        const rawJson = raw.substring(firstIndex, lastIndex);
        // console.log(rawJson);

        const json = JSON.parse(rawJson);
        console.log(json);
        const itemList = json.mods.listItems
        console.log(itemList);

        let temparr = [];
        Object.keys(this.state).map(key => {
            if (key === "itemList" || key === "links") return;
            if (this.state[key] === true) temparr.push(key);
        })

        var tempItemList = [];
        for (let i = 0; i < itemList.length; i++) {
            let current = itemList[i]
            let newCurrent = {};
            for(let j = 0; j < temparr.length; j++) {
                // console.log("here: ", temparr);
                if (temparr[j] === "productUrl") current[temparr[j]] = "https:" + current[temparr[j]];
                newCurrent = { ...newCurrent, [temparr[j]]: current[temparr[j]] };
            }
            tempItemList.push({index: i + 1, ...newCurrent});
        }

        console.log(tempItemList);
        Object.keys(tempItemList[0]).map(key => console.log(key));
        temparr.unshift("index")
        console.log(temparr);
        this.setState({ itemList: tempItemList, headings: temparr });

    }

    handleChange(field, e) {
        console.log(e.target.checked, field);
        this.setState({ ...this.state, [field]: e.target.checked });
    }

    render() {
        return(
            <Body>
                <NavBar/>
                <Container>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Label>View Source Lazada Here: </Label>
                        <FormWrapper>
                            <FormGroup>
                                <TextArea name="" id="" cols="30" rows="10" required></TextArea>
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel control={ <Checkbox type="checkbox" value="Image" onChange={ this.handleChange.bind(this, "image")}/> } label="Image"/>
                                <FormControlLabel control={ <Checkbox type="checkbox" value="Name" onChange={ this.handleChange.bind(this, "name")}/> } label="Name"/>
                                <FormControlLabel control={ <Checkbox type="checkbox" value="Seller ID" onChange={ this.handleChange.bind(this, "sellerId")}/> } label="Seller ID"/>
                                <FormControlLabel control={ <Checkbox type="checkbox" value="Seller Name" onChange={ this.handleChange.bind(this, "sellerName")}/> } label="Seller Name"/>
                                <FormControlLabel control={ <Checkbox type="checkbox" value="Brand ID" onChange={ this.handleChange.bind(this, "brandId")}/> } label="Brand ID"/>
                                <FormControlLabel control={ <Checkbox type="checkbox" value="Brand Name" onChange={ this.handleChange.bind(this, "brandName")}/> } label="Brand Name"/>
                                <FormControlLabel control={ <Checkbox type="checkbox" value="Product Url" onChange={ this.handleChange.bind(this, "productUrl")}/> } label="Product Url"/>
                                <FormControlLabel control={ <Checkbox type="checkbox" value="Price Show" onChange={ this.handleChange.bind(this, "priceShow")}/> } label="Price Show"/>
                                <FormControlLabel control={ <Checkbox type="checkbox" value="Location" onChange={ this.handleChange.bind(this, "location")}/> } label="Location"/>
                            </FormGroup>
                        </FormWrapper>
                        <SubmitButton type="submit" value="Hit it" />
                    </Form>
                </Container>
                <ResultContainer>
                    <StyledTable width={1}>
                        <TableHead>
                            <TableRow>
                                {/* { this.state.itemList.length > 0 ? Object.keys(this.state.itemList[0]).map(key => <TableCell>{key}</TableCell>) : null} */}
                                { this.state.headings.length > 0 ? this.state.headings.map(heading => <TableCell>{heading}</TableCell>) : null}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { this.state.itemList.length > 0 ? this.state.itemList.map(item => 
                                <TableRow>
                                    { Object.keys(item).map(key => 
                                        <React.Fragment>
                                            { key === "image" ? <TableCell><Image src={item[key]}/></TableCell> : <TableCell>{item[key]}</TableCell>}
                                        </React.Fragment>
                                    )}
                                </TableRow>
                            ) : null}
                        </TableBody>
                    </StyledTable>
                </ResultContainer>
            </Body>
        )
    }
}

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

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
`

const NavBar = () => {
    return(
        <NavBarContainer>
            <LogoHeading>Bunnie's Tool Box</LogoHeading>
            <Simple><StyledLink to="/">Simple Mode</StyledLink></Simple>
        </NavBarContainer>
    )
}
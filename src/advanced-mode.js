import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

import { Tooltip, FormGroup, FormControlLabel, Checkbox, TableRow, Table, TableBody, TableHead, TableCell } from '@material-ui/core';

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
    /* margin: 0 6em; */
    /* justify-content: center; */
    max-width: 90%;
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
        isHidden: false,
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
        const itemList = json.mods.listItems

        let headings = [];
        let links = "";
        Object.keys(this.state).map(key => {
            if (key === "itemList" || key === "links" || key === "headings" || key === "isHidden") return;
            if (this.state[key] === true) headings.push(key);
        })

        var parsedItemList = [];
        for (let i = 0; i < itemList.length; i++) {
            let current = itemList[i]
            let newCurrent = {};
            for(let j = 0; j < headings.length; j++) {
                // console.log("here: ", headings);
                if (headings[j] === "productUrl") {
                    current[headings[j]] = "https:" + current[headings[j]];
                    links = links + current[headings[j]] + "\n";
                }
                newCurrent = { ...newCurrent, [headings[j]]: current[headings[j]] };
            }
            parsedItemList.push({index: i + 1, ...newCurrent});
        }
        Object.keys(parsedItemList[0]).map(key => console.log(key));
        headings.unshift("index")

        this.setState({ itemList: parsedItemList, headings, links});

    }

    handleChange(field, e) {
        this.setState({ ...this.state, [field]: e.target.checked });
    }

    handleHideForm() {
        const { isHidden } = this.state;
        let temp = !isHidden;
        this.setState({ isHidden: temp });
    }

    handleCopyLink(e) {
        var dummy = document.createElement("textarea");
        dummy.value = this.state.links;
        document.body.appendChild(dummy);
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }

    render() {
        return(
            <Body>
                <NavBar/>
                <Container>
                    { !this.state.isHidden ? <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Label>View Source Lazada Here: </Label>
                        <FormWrapper>
                            <FormGroup>
                                <TextArea name="" id="" cols="30" rows="10" required></TextArea>
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel control={ <Checkbox type="checkbox" value="Image" onChange={ this.handleChange.bind(this, "image")}/> } label="Image"/>
                                <FormControlLabel control={ <Checkbox type="checkbox" value="Cheapest Sku" onChange={ this.handleChange.bind(this, "cheapest_sku")}/> } label="Sku"/>
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
                    </Form> : null}
                </Container>
                {this.state.headings.length > 0 && this.state.itemList.length > 0 ?
                    <ResultContainer>
                        <ToolContainer>
                            <Tooltip title="Copy all links to Clipboard">
                                <CopyLinkButton onClick={ this.handleCopyLink.bind(this) }>Copy All Links</CopyLinkButton>
                            </Tooltip>
                            <Tooltip title="Hide Form">
                                <CopyLinkButton onClick={ this.handleHideForm.bind(this) }>{ this.state.isHidden ? "Show Form" : "Hide Form"}</CopyLinkButton>
                            </Tooltip>
                        </ToolContainer>
                        <StyledTable fixedHeader={true} style={{ width: "900px", tableLayout: 'auto' }}>
                            <TableHead>
                                <TableRow>
                                    {/* { this.state.itemList.length > 0 ? Object.keys(this.state.itemList[0]).map(key => <TableCell>{key}</TableCell>) : null} */}
                                    { this.state.headings.map(heading => <TableCell>{heading}</TableCell>) }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { this.state.itemList.map(item => 
                                    <TableRow>
                                        { Object.keys(item).map(key => 
                                            <React.Fragment>
                                                { key === "image" ? <TableCell><Image src={item[key]}/></TableCell> : <TableCell>{item[key]}</TableCell>}
                                            </React.Fragment>
                                        )}
                                    </TableRow>
                                ) }
                            </TableBody>
                        </StyledTable>
                    </ResultContainer> 
                : null }
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


const ToolContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 60px;
    align-items: center;
`

const CopyLinkButton = styled.button`
    height: 40px;
    width: 120px;
    background-color: #cc7764;
    color: white;
    border-radius: 4px;
    border: none;
    outline: none;
    font-weight: bold;
    cursor: pointer;
    margin: 0 1em 0 0;

    &:hover {
        height: 38px;
    }
`

const HideForm = styled.button`
    height: 50px;
    width: 50%;
    font-size: 18px;
    background-color: #cc7764;
    color: white;
    border-radius: 8px;
    border: none;
    outline: none;
    font-weight: bold;
    cursor: pointer;
    margin-top: 1em;
`

const NavBar = () => {
    return(
        <NavBarContainer>
            <LogoHeading>Bunnie's Tool Box</LogoHeading>
            <Simple><StyledLink to="/">Simple Mode</StyledLink></Simple>
        </NavBarContainer>
    )
}
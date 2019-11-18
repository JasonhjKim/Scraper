import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';


const Body = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const TextArea = styled.textarea`
    width: 550px;
    height: 280px;
    border-radius: 4px;
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
    align-self: center;
    margin: 1em;
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


export default class SimpleMode extends Component {
    state = {
        itemList: [],
        links: "",
    }
    handleSubmit(e) {
        e.preventDefault();
        // console.log(e.target[0].value)
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

        let tempItemList = [];
        for (let i = 0; i < itemList.length; i++) {
            const { productUrl, sellerName, sellerId} = itemList[i];
            let tempProductURL = "https:" + productUrl;
            console.log(tempProductURL)
            // itemList[i].productUrl = tempProductURLs;
            // stringBuilder = stringBuilder + tempProductURLs;

            tempItemList.push({ index: i + 1, sellerId, sellerName, productUrl: tempProductURL });
        }

        this.setState({ itemList: tempItemList });
    }

    render() {
        return(
            <Body>

                <NavBar/>
                
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Label>Copy + Paste View Source Lazada Here: </Label>
                    <TextArea name="" id="" cols="30" rows="10" required></TextArea>
                    <SubmitButton type="submit" value="Hit it" />
                </Form>

                { this.state.itemList.length > 0 &&
                <ResultContainer>
                    <Label>{`Found Links (${this.state.itemList.length}):`}</Label>
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell> Seller ID</TableCell>
                                <TableCell> Seller Name</TableCell>
                                <TableCell> Product URL</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                 this.state.itemList.map((item) => 
                                 <TableRow>
                                     <TableCell>{item.index}</TableCell>
                                     <TableCell> {item.sellerId}</TableCell>
                                     <TableCell> {item.sellerName}</TableCell>
                                     <TableCell> {item.productUrl}</TableCell>
                                 </TableRow>
                            )}
                        </TableBody>
                    </StyledTable>
                    {/* <ResultArea showLineNumbers={true} >
                        {this.state.links.length > 0 ? this.state.links : null}
                    </ResultArea> */}
                </ResultContainer>
            }

                {/* <div>
                    { this.state.itemList.length > 0 ?
                        this.state.itemList.map((item) => 
                        <Item productUrl={item.productUrl} name={item.name} image={item.image} priceShow={item.priceShow}/>
                        ) : null
                    }
                </div> */}
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


const Advanced = styled.button`
    color: white;
    background-color: #cc7764;
    width: 150px;
    height: 40px;
    border-radius: 8px;
    border: none;
    outline: none;
    font-size: 14px;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
`

const NavBar = () => {
    return(
        <NavBarContainer>
            <LogoHeading>Bunnie's Tool Box</LogoHeading>
            <Advanced><StyledLink to="/advanced">Advanced Mode</StyledLink  ></Advanced>
            <Advanced><StyledLink to="/checker">Checker Mode</StyledLink></Advanced>
        </NavBarContainer>
    )
}
import React, { Component } from 'react';
import styled from 'styled-components';

export default class Item extends Component {
    render() {
        const { productUrl, image, name, priceShow, } = this.props;
        console.log(image);
        return(
            <ItemContainer>
                <Img src={image} alt="no image"/>

                <SubContainer>
                    <ValueContainer>
                        <Title><Label>Name: </Label> {name}</Title>
                    </ValueContainer>

                    <ValueContainer>
                        <Title><Label>Price: </Label>{priceShow}</Title>
                    </ValueContainer>

                    <ValueContainer>
                        <Title><Label>Product URL: </Label><a href={productUrl} target="_blank">{productUrl}</a></Title>
                    </ValueContainer>
                </SubContainer>
            </ItemContainer>
        )
    }
}

const ItemContainer = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: row;
    margin-bottom: 0.5em;

    border-bottom: 1px solid black;
`

const Img = styled.img`
    max-width: 100px;
    max-height: 100px;
    object-fit: cover
`

const SubContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    font-size: 14px;
    font-weight: bold;
    color: #6485CC;
`

const Title = styled.div`
    font-size: 14px;
`

const ValueContainer = styled.div`

    display: flex;
    flex-direction: column;
`
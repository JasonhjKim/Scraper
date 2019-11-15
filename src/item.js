import React, { Component } from 'react';

export default class Item extends Component {
    render() {
        const { productUrl, image, name, priceShow, } = this.props;
        return(
            <div>
                <div>{name}</div>
                <img src={image}/>
                <div>{priceShow}</div>
                <div>{productUrl}</div>
            </div>
        )
    }
}
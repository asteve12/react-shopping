import { Button } from "@material-ui/core";
import React from "react";
//Types
import { CartItemType } from "../App";
//styles
import { Wrapper } from "./item.style";


type Props ={
    item:CartItemType;
    handleAddToCart:(clickedItem:CartItemType)=> void
}


const Item = ({item,handleAddToCart}:Props) => {
    return <Wrapper>
        <img src={item.image} alt="product img" />
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>${item.price}</h3>
        </div>
        <Button  onClick={()=> handleAddToCart(item)}>ADD TO CART</Button>
    </Wrapper>



}



export default Item
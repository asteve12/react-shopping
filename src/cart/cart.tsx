import CartItem from "../cartItem/cartItem";
//Styles
import { Wrapper } from "./cart.style";
//types
import { CartItemType } from "../App";


type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;

}


const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
    const calculateTotal = (items: CartItemType[]) => items.reduce((ack: number, item) => ack + item.amount * item.price,0)
        
    

    return (
        <Wrapper data-testid="modal" >
            <h2>Your shopping cart</h2>
            {cartItems.length === 0 ? <p>No items in cart. </p>:null }
            {cartItems.map(item => (
                <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart= {removeFromCart}
                ></CartItem>
            ))}
            <h2>Total: $ {calculateTotal(cartItems).toFixed(2) }</h2>
        </Wrapper>
    )
    
} 


export default Cart

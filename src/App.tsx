import {useState} from "react"
import { useQuery } from "react-query";
//components
import Drawer from  "@material-ui/core/Drawer"
import { Badge, Grid, LinearProgress } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import Cart from "./cart/cart";
import Item from "./Item/item";
//styles
import { Wrapper, StyledButton } from "./app.style";





//types
export type CartItemType = {
  id:number;
  category:string; 
  description:string;
  image:string;
  price:number;
  title:string;
  amount:number;
}

const getProducts = async ():Promise<CartItemType []> => await (await (await fetch("https://fakestoreapi.com/products")).json())


const App = () => {
  
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems,setCartItems] = useState( [] as CartItemType [])
  const {data,isLoading,error} = useQuery<CartItemType[]>("products",
  getProducts
  )

//help get total items
  const getTotalItems = (items: CartItemType[]) => items.reduce((acc: number, items) => acc + items.amount,0)


//help handle cart
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => { 
      const isItemInCart  = prev.find(item => item.id === clickedItem.id)
      if (isItemInCart) {
        return prev.map(item => (
          item.id === clickedItem.id ?
            { ...item, amount: item.amount + 1 } :
            item
        ))
       
      }
      //first time the item is added
      return [...prev,{...clickedItem, amount: 1}]
    
    })
}

//help remove cart item
 const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => (
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, {...item, amount: item.amount-1}]
          
        } else {
          return [...ack, item]
        }
        
      }, [] as CartItemType [] )
    ))
  
};

if(isLoading) return <LinearProgress/>

if(error) return <div>something went wrong ........</div>
 
 
   
  return (
    <Wrapper className="App">
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        ></Cart>
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error" >
          <AddShoppingCart></AddShoppingCart>
        </Badge>
      </StyledButton>
     <Grid container spacing={3}>
       {
         data?.map((item)=> <Grid item key={item.id}
         xs={12}
         sm={4}
         >
      
           <Item item={item} handleAddToCart={handleAddToCart}/>
           
         </Grid>)
       }

     </Grid>
    </Wrapper>
  );
}

export default App;

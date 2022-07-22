import App from "../App";
import { render, waitForElementToBeRemoved, queryByAttribute, screen,waitFor, logRoles, findByText } from "@testing-library/react"

 import userEvent from "@testing-library/user-event"   
import { QueryClient, QueryClientProvider } from "react-query";
import { rest } from "msw"
import { setupServer } from "msw/node"

const server = setupServer(
    rest.get("https://fakestoreapi.com/products", (req, res, ctx) => {
        return res(
            ctx.json([
                {"id":1,"title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops","price":109.95,"description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing","image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg","rating":{"rate":3.9,"count":120}}
            ])
        )
        
    })
)


beforeAll(() => {
    // Establish requests interception layer before all tests.
    server.listen()
})
  

afterAll(() => {
    // Clean up after all tests are done, preventing this
    // interception layer from affecting irrelevant tests.
    server.close()
  })
  
test("test home page",async () => {
    const queryObj = new QueryClient
    const getById = queryByAttribute.bind(null, 'id');
    const user = userEvent.setup()
    
    let dom = render(
        < QueryClientProvider client={queryObj}> 
        <App></App>
        </QueryClientProvider>)
    
    await waitForElementToBeRemoved(() => getById(dom.container, 'loader'))

    let addCartBtn = screen.getByText(/add to cart/i)
    await user.click(addCartBtn)
    let amountSel = dom.container.getElementsByClassName("MuiBadge-colorError")[0]
    expect(amountSel).toHaveTextContent("1")

    

    

    
    
    
  

    
})


test("test adding and removing of cart item", async () => {
    const queryObj = new QueryClient
    const getById = queryByAttribute.bind(null, 'id');
    const user = userEvent.setup()
    
    let dom = render(
        < QueryClientProvider client={queryObj}> 
        <App></App>
        </QueryClientProvider>)
    
    await waitForElementToBeRemoved(() => getById(dom.container, 'loader'))

    let addCartBtn = screen.getByText(/add to cart/i)
    await user.click(addCartBtn)
    let amountSel = dom.container.getElementsByClassName("MuiBadge-colorError")[0]
 
    expect(amountSel).toHaveTextContent("1")

    let openCartBtn = dom.container.getElementsByClassName("MuiButtonBase-root MuiIconButton-root sc-eCYdqJ lmTCEp")[0]
    await user.click(openCartBtn)

    await waitFor(() => screen.getByText(/Your shopping cart/i))
    await screen.findByText("Your shopping cart")

    let  cartWrapper = dom.container.getElementsByTagName("aside")[0]
  
    let img = screen.getByAltText("product img")
   expect(img.src).toBe("https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg")
  
    let increaseBtn = screen.getByText("+")
    let decreaseBtn = screen.getByText("-")
    let priceText = screen.getByText(/price/i)
    let totalTxt = screen.queryAllByText(/total/i)
    let btnCont = screen.getByTestId('amount')
    
    expect(priceText).toHaveTextContent("Price: $109.95")
    expect(totalTxt[0]).toHaveTextContent("Total: $109.95")
    await user.click(increaseBtn)
    expect(btnCont).toHaveTextContent("2")
    expect(totalTxt[0]).toHaveTextContent("Total: $219")

    await user.click(decreaseBtn)
    expect(btnCont).toHaveTextContent("1")
    expect(totalTxt[0]).toHaveTextContent("Total: $109.95")
    
    // let amtToBuy = btnCont.children[1]
   
  
   
   
    
    


  
     
    


    // let productImg = screen.getByAltText("product img")
    // expect(productImg.src).toContain("https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg")
    
 
    // let buttonContainer = dom.container.getElementsByClassName("buttons")[0]
    // console.log("doming", buttonContainer)
    // let deBtn = buttonContainer.firstChild();
    // let inBtn = buttonContainer.lastChild()
    // let priceCOntainer = dom.container.getElementsByClassName("informations")[0]
    // let price = buttonContainer.firstChild();
    // let total = buttonContainer.lastChild()
    // user.click(deBtn)
    // expect(total).toHaveTextContent("Total: $0.00")
    // let cartContainer =  dom.container.getElementsByTagName("aside")[0]
    // expect(cartContainer).not.toBeInTheDocument()
    // console.log("hello", cartContainer)
  
   
   
    //  expect(cartContainer).toHaveLength(3)
    
    
})
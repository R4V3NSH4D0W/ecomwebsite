import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import parserequestUrl, { rerender } from "../utils";

const addToCart=(item, forceUpdate=false)=>{
    let cartItems= getCartItems();
    const exitItem=cartItems.find((x)=>x.product === item.product);
    if(exitItem){
        if(forceUpdate){
             cartItems=cartItems.map((x)=>
             x.product===exitItem.product? item: x);
        }
       
    }else{
        cartItems=[...cartItems, item];
    }
    setCartItems(cartItems);
    if(forceUpdate){
    rerender(CartScreen);
    }
    
};
const removeFromCart =(id)=>{
    setCartItems(getCartItems().filter(x=>x.product !==id));
    if(id===parserequestUrl().id){
        document.location.hash='/cart';
    }else{
        rerender(CartScreen);
    }
};
const CartScreen ={
    after_render:()=>{
       const qtySelects= document.getElementsByClassName("qty-select");
       Array.from(qtySelects).forEach(qtyselect=>{
        qtyselect.addEventListener('change',(e)=>{
            const item=getCartItems().find((x)=>x.product===qtyselect.id);
            addToCart({...item, Qty:Number(e.target.value)},true)
        });
       });
const deleteButtons= document.getElementsByClassName("delete-button");
Array.from(deleteButtons).forEach(deleteButton=>{
    deleteButton.addEventListener('click',()=>{
        removeFromCart(deleteButton.id);
    });
});
document.getElementById("checkout-button").addEventListener("click",()=>{
    document.location.hash='/signin';

})
    },
    render:async()=>{
        const request= parserequestUrl();
        if(request.id){
            const product= await getProduct(request.id);
            addToCart({
                product: product._id,
                name:product.name,
                image:product.image,
                price: product.price,
                countInStock: product.countInStock,
                Qty: 1,

            })
        }
    
        const cartItems=getCartItems();
        return `<table>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>price</th>
                </tr>
                <tr>
                </table>
        ${
            cartItems.length ===0?
            `<div> cart is empty.<a href="/#/">Go Shopping</a>`:
            cartItems.map(item=>`
            <table>
            <div class="small-container cart-page">

            
                    <td>
                        <div class="cart-info">
                            <img src="${item.image}" alt="${item.name}"/>
                            <div>
                            <a href="/#product/${item.product}">
                                <p>${item.name}</p>
                                <br>
                                </select>
                                <button type="button" class="delete-button" id="${item.product}">
                                Delete
                                </button>
                            </div>
                        </div>
                    </td>
                    <td><select class="qty-select" id="${item.product}">
                    ${[...Array(item.countInStock).keys()].map(x=>item.Qty==x+1?
                        `<option selected value="${x+1}">${x+1}</option>`:
                        `<option value="${x+1}">${x+1}</option>`
                        )}
                    </select></td>
                    <td>Rs ${item.price}</td>
                </tr>
            </table>
        </div>
            `).join('\n')
        }
        <div class="total-price">
            <h3>
            Subtotal (${cartItems.reduce((a,c)=>a+c.Qty,0)}items)
            :
            Rs ${cartItems.reduce((a,c)=>a+c.price * c.Qty,0)}
            <h3>
            <button id="checkout-button" class="checkout" >
            Proceed to checkout</button>
            </div>`

    },
};
export default CartScreen;
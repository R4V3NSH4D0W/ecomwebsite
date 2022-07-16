import { getProduct } from "../api";
import {parserequestUrl} from'../utils';
import Rating from "../components/rating";
const ProductScreen ={
    after_render: ()=>{
        const request=parserequestUrl();
        document.getElementById("add-button").addEventListener('click',
        ()=>{
            document.location.hash=`/cart/${request.id}`;
        });
    },
    render: async()=>{
        const request =parserequestUrl();
        const product= await getProduct(request.id);
        if(product.error){
            return `<div>${product.error}</div>`;
        }
        return `<div class="small-container single-product">
        <p><h1><strong>Home </strong></h1></p>
        <div class="rowx" >
            <div class="col-2-image">
                <img src="${product.image}" alt="${product.name} "  height="75%">
                </div>
                <div class="detail-info">
                <h1>${product.name}</h1>
                ${Rating.render({
                    value: product.rating,
                    text:`${product.numReviews} reviews`,
                })}

                <h4>
                   Price:<strong> RS ${product.price}</strong>
                </h4>

                Description:
                <div>
                ${product.description}
                </div>
                <div>
                Status :
                ${
                    product.countInStock>0
                    ?`<span class="sucess">In Stock</span>`
                    :`<span class="error">unavilable</span>`
                }
                </div>
                <input type="number" value="1">
                <a id="add-button" class="btn">Add to Cart</a>
            </div>
            </div>
            </div>
`;
    }
}
export default ProductScreen;
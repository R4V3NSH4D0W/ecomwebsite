import Rating from "../components/rating";
const HomeScreen ={
    render: async()=>{
        const response =await fetch("http://localhost:5000/api/products",{
            headers:{
                'Content-Type': 'application/json',
            },
        });
        if(!response || !response.ok){

            return `<div> Error in getting data </div>`;

        }
        const products= await response.json();
        //get backend data to front end
        
        return`
        <ul class="products">
        ${products
            .map(
            (product)=>`
            <li>
            <div class="row">
                <div class="col-4">
                <a href="/#/product/${product._id}">
                    <img src="${product.image}"alt="${product.name}">
                    </a>
                    <h4>${product.name}</h4>

                    <div class="product-rating">
                    ${Rating.render({value: product.rating,
                         text: `${product.numReviews} reviews`,
                    })}
                    <p>
                    NRP ${product.price}
                    </p>
                </div>
                </li>
            `,
        ).join('\n')
    }
        `}
            
    }
export default HomeScreen;
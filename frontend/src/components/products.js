import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';


function Products(props){
    const {products} = props;
    return(  
        <div key={products._id}>    
          <li>
            <div className="product">
            <Link to={'/product/' + products._id}> <img
                className="product-image"
                src={products.image}
                alt="product 1"
              /></Link>

              <div className="product-name">
                {/* <Link to={'/product/' +  product._id}>{product.name}</Link> */}
                <Link to={`/product/${products._id}`}>{products.name}</Link>
              </div>
              <div className="product-brand">{products.brand}</div>
              <div className="product-price">${products.price}</div>
              <div className="product-rating">
                  <Rating rating={products.rating} numReviews={products.numReviews}></Rating>             
              </div>
            </div>
          </li>
      </div> 
 
    )
}

export default Products

{/* <div>{products.map((product)=> (<Products key={product._id} products={product}></Products>))}</div>
    
}
</div> */}
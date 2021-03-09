import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from "../actions/productsActions";

function HomeScreen(props) {
  // axios library is used to fetch data from an api
  // define a hook
  // const [products, setProduct] = useState([]);
  const productList = useSelector(state => state.productList);
  const { products, loading, error} = productList;
  const dispatch = useDispatch(listProducts())
  // to fetch data from server
  useEffect(() => {
    // const fetchData = async () =>{
    //   const {data} = await axios.get("/api/products");
    //   setProduct(data)
    // }
    // fetchData();
    dispatch(listProducts()); 
    return () => {
      //  cleanup
    };
    // an empty array means that this will run only at component did mount
  }, [])

  return (
    loading? <div>loading...</div> :
    error? <div>{error}</div>:
    <div>
      <ul className="products">
        {products.map(product => (
          <li key= {product._id}>
            <div className="product">
            <Link to={'/product/' + product._id}> <img
                className="product-image"
                src={product.image}
                alt="product 1"
              /></Link>
             
              <div className="product-name">
                {/* <Link to={'/product/' +  product._id}>{product.name}</Link> */}
                <Link to={`/product/${product._id}`}>{product.name}</Link>
              </div>
              <div className="product-brand">{product.brand}</div>
              <div className="product-price">${product.price}</div>
              <div className="product-rating">
                {product.rating} Stars {product.numReviews}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomeScreen;

import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from "../actions/productsActions";
import Products from "../components/products";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

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
    <div>
    {loading ? <LoadingBox></LoadingBox> :
    error ? <MessageBox variant='danger'>{error}</MessageBox>:
    <div>
    <ul className='products'>
    {products.map((product)=>
    (<Products products={product}></Products>))}
    </ul>
    
     </div>
    }
   </div>
  );
}

export default HomeScreen;


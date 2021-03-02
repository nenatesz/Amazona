import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { detailsProduct } from '../actions/productsActions';




function ProductScreen(props) {
    
    // const product = data.products.find(x => x._id === parseInt(props.match.params.id));
       const [qty, setQty] = useState(1);
       const productDetails = useSelector(state => state.productDetails);
       const {product, loading, error} = productDetails;
       const dispatch = useDispatch();

    useEffect(() => {
         dispatch(detailsProduct(props.match.params.id))
        return () => {

        };
    }, [])
    
    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }

    return(       
        <div>
            <div className='back-to-result'>
                <Link to='/'>Back to results</Link> 
            </div>
            {loading? <div>Loading...</div> :
            error?<div>{error}</div> :
            (
                <div className='details'>
                            <div className='details-image'>
                                <img src={product.image} alt={product.name}/>
                            </div>
                            <div className='details-info'>
                            <ul>
                                <li>
                                    <b>{product.name}</b>
                                </li>
                                <li>
                                    {product.rating} Stars ({product.numReviews} Reviews)
                                </li>
                                <li>
                                price: <b>${product.price}</b>
                                </li>
                                <li>
                                    Description:
                                    {product.description}
                                </li>
                            </ul>
                            </div>
                            <div className='details-action'>
                                <ul>
                                    <li>
                                        price: <b>${product.price}</b>
                                    </li>
                                    <li>
                                        status: {product.countInStock > 0? "In Stock." : "Out of Stock."}
                                    </li>
                                    <li>
                                        <label>Qty:</label>
                                        <select value={qty} onChange={(e) => { setQty(e.target.value) } }>
                                        {[...Array(product.countInStock).keys()].map(x => 
                                            <option key= {x + 1} value={x + 1}>{x + 1}</option>
                                            )}
                                        </select>
                                    </li>
                                    <li>
                                        {product.countInStock > 0 && <button onClick={handleAddToCart} className='button'>
                                            Add to Cart
                                        </button>}
                                        
                                    </li>
                                </ul>
                            </div>
                            </div>
                            )
                            }
                        </div>
    )
}

export default ProductScreen;
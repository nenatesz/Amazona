import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { detailsProduct } from '../actions/productsActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';




function ProductScreen(props) {
    
    // const product = data.products.find(x => x._id === parseInt(props.match.params.id));
       const [qty, setQty] = useState(1);
       const productDetails = useSelector(state => state.productDetails);
       const productId = props.match.params.id
       const {product, loading, error} = productDetails;
       const dispatch = useDispatch();

    useEffect(() => {
         dispatch(detailsProduct(productId))
    }, [dispatch, productId ])
    
    const handleAddToCart = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`)
        // props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }

    return( 
        <div>
            {loading ? <LoadingBox></LoadingBox> :
            error ? <MessageBox variant='danger'>{error}</MessageBox> : 
            (<div>
            <div className='back-to-result'>
                <Link to='/'>Back to results</Link> 
            </div>
                <div className='details'>
                            <div className='details-image'>
                                <img src={product.image} alt={product.name}></img>
                            </div>
                            <div className='details-info'>
                            <ul>
                                <li>
                                    <b>{product.name}</b>
                                </li>
                                <li>
                                    <Rating rating ={product.rating}  numReviews={product.numReviews}></Rating>
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
                                        <div className='row'>
                                       <div>price:</div> 
                                       <div><b>${product.price}</b></div> 
                                        </div>
                                    </li>
                                    <li>
                                        <div className='row'>
                                            <div>Status:</div>
                                            <div>
                                        {product.countInStock > 0 ? (<span className='in-stock'>In Stock.</span>): (<span className='outof-stock'>Out of Stock.</span>)}
                                        </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='row'>
                                        <div>Qty:</div>
                                        <div>
                                        <select value={qty} onChange={(e) => { setQty(e.target.value) } }>
                                        {[...Array(product.countInStock).keys()].map(x => 
                                            <option key= {x + 1} value={x + 1}>{x + 1}</option>
                                            )}
                                        </select>
                                        </div>
                                        </div>
                                    </li>
                                    <li>
                                        {product.countInStock > 0 && <button onClick={handleAddToCart} className='button'>
                                            Add to Cart
                                        </button>}
                                        
                                    </li>
                                </ul>
                            </div>
                            </div>
                            </div>
                    

            )
            } 
             
        </div>
            )
                            
    
}

export default ProductScreen;
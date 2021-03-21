import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT, CART_EMPTY } from "../constants/cartConstants";

function cartReducer(state= { cartItems:[]}, action){
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            // check if there is a product with the same id in the cart.
            const existItem = state.cartItems.find(x => x.product === item.product);
            if (existItem) {
                return{
                    ...state,
                    cartItems:
                    state.cartItems.map((x) => x.product === existItem.product ? item : x)
                };
            }else{
                return { ...state, cartItems: [...state.cartItems, item] };               
            }
        case CART_REMOVE_ITEM:
            return {...state, 
                cartItems: state.cartItems.filter((x) => x.product !== action.payload)};
        case CART_SAVE_SHIPPING:
            return {...state, shippingAddress: action.payload};
        case CART_SAVE_PAYMENT:
            return {...state, payment: action.payload};
        case CART_EMPTY:
            return {...state, cartItems: []}
        default:
            return state; 
        


    }
}

export {cartReducer}




















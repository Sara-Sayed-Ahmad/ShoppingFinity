import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    TotalQuantity: 1,
    TotalAmount: 0,
}

const CartSlise = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) =>{
            state.cartItems.push(action.payload);
        },
    },
});

export const {addToCart} = CartSlise.actions;

export default CartSlise.reducer;
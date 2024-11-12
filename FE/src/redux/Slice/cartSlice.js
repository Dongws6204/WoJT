import { createSlice } from "@reduxjs/toolkit";



// tải giỏ hàng trên local
const loadCartFromLocalStorage = () => {
    try {
        const serializedCart = localStorage.getItem('CartArr');
        return serializedCart ? JSON.parse(serializedCart) : [];
    } catch (e) {
        return [];
    }
};

// lưu giỏ hàng vào local
const saveCartToLocalStorage = (cart) => {
    try {
        const serializedCart = JSON.stringify(cart);
        localStorage.setItem('CartArr', serializedCart);
    } catch (e) {
        console.warn("Could not save cart data", e);
    }
};

const ProductCart = createSlice({
    name: 'product_cart',
    initialState: {
        CartArr: loadCartFromLocalStorage(),
        selectedSize: []
    },
    reducers: {
        addToCart: (state, action) => {
            // const product__id = state.CartArr.findIndex((p) => p.product_id === action.payload.product_id)
            // const id__prod = state.CartArr.findIndex((p) => p.id_prod === action.payload.id_prod)

            if(state.selectedSize.length === 0){
                alert('Vui lòng chọn size')
            } else {
                const existingItem = state.CartArr.findIndex(
                    (p) => p.product_id === action.payload.product_id && p.id_prod === state.selectedSize[0]?.id_prod
                );
    
                if (existingItem===-1) {
                    const limitedPayload = Object.fromEntries(Object.entries(action.payload).slice(0, 4));
                    state.CartArr.push({ ...limitedPayload,...state.selectedSize[0], quantity: 1 })
                } else {
                    state.CartArr[existingItem].quantity += 1;
                }
                state.selectedSize = [];
    
                saveCartToLocalStorage(state.CartArr);
            }
        },
        DeleteFromCart: (state, action) => {
            const itemIndex = state.CartArr.findIndex((p) => p.product_id === action.payload.product_id && p.id_prod === action.payload.id_prod);
            if (state.CartArr[itemIndex].quantity > 1) {
                state.CartArr[itemIndex].quantity -= 1;
            } else if (state.CartArr[itemIndex].quantity === 1) {
                state.CartArr.splice(itemIndex, 1);
            }
            saveCartToLocalStorage(state.CartArr);
        },
        addSize: (state, action) => {
            // Update selectedSize with id_prod and size
            state.selectedSize = [{ id_prod: action.payload.id_prod, size: action.payload.size }];
        },
        DeleteBtn: (state, action) => {
            const itemIndex = state.CartArr.findIndex((p) => p.product_id === action.payload.product_id && p.id_prod === action.payload.id_prod);
            state.CartArr.splice(itemIndex, 1);
            saveCartToLocalStorage(state.CartArr);
        },
        addBtn: (state,action) => {
            const itemIndex = state.CartArr.findIndex((p) => p.product_id === action.payload.product_id && p.id_prod === action.payload.id_prod);
            state.CartArr[itemIndex].quantity += 1;
            saveCartToLocalStorage(state.CartArr);
        }
    },
})

export const { addToCart, DeleteFromCart, addSize ,DeleteBtn,addBtn} = ProductCart.actions

export default ProductCart.reducer
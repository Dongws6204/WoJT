import { createSlice } from "@reduxjs/toolkit";



// tải giỏ hàng trên local
const loadCartFromLocalStorage = (userId) => {
    try {
        const cartKey = userId ? `CartArr_${userId}` : 'CartArr_guest'; 
        const serializedCart = localStorage.getItem(cartKey);
        return serializedCart ? JSON.parse(serializedCart) : [];
    } catch (e) {
        return [];
    }
};

// lưu giỏ hàng vào local
const saveCartToLocalStorage = (cart, userId) => {
    try {
        const cartKey = userId ? `CartArr_${userId}` : 'CartArr_guest';  
        const serializedCart = JSON.stringify(cart);
        localStorage.setItem(cartKey, serializedCart);
    } catch (e) {
        console.warn("Could not save cart data", e);
    }
};

const ProductCart = createSlice({
    name: 'product_cart',
    initialState: {
        CartArr: [], 
        selectedSize: []
    },
    reducers: {
        initializeCart: (state, action) => {
            const userId = action.payload.userId;
            state.CartArr = loadCartFromLocalStorage(userId);
        },
        addToCart: (state, action) => {
            const userId = action.payload.userId;
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
    
                saveCartToLocalStorage(state.CartArr, userId);
            }
        },
        DeleteFromCart: (state, action) => {
            const userId = action.payload.userId;
            const itemIndex = state.CartArr.findIndex((p) => p.product_id === action.payload.product_id && p.id_prod === action.payload.id_prod);
            if (state.CartArr[itemIndex].quantity > 1) {
                state.CartArr[itemIndex].quantity -= 1;
            } else if (state.CartArr[itemIndex].quantity === 1) {
                state.CartArr.splice(itemIndex, 1);
            }
            saveCartToLocalStorage(state.CartArr,userId);
        },
        addSize: (state, action) => {
            // Update selectedSize with id_prod and size
            state.selectedSize = [{ id_prod: action.payload.id_prod, size: action.payload.size }];
        },
        DeleteBtn: (state, action) => {
            const userId = action.payload.userId;
            const itemIndex = state.CartArr.findIndex((p) => p.product_id === action.payload.product_id && p.id_prod === action.payload.id_prod);
            state.CartArr.splice(itemIndex, 1);
            saveCartToLocalStorage(state.CartArr,userId);
        },
        addBtn: (state,action) => {
            const userId = action.payload.userId;
            const itemIndex = state.CartArr.findIndex((p) => p.product_id === action.payload.product_id && p.id_prod === action.payload.id_prod);
            state.CartArr[itemIndex].quantity += 1;
            saveCartToLocalStorage(state.CartArr,userId);
        }
    },
})

export const { addToCart, DeleteFromCart, addSize ,DeleteBtn,addBtn, initializeCart} = ProductCart.actions

export default ProductCart.reducer
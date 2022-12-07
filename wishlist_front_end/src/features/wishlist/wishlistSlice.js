import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {wishlistGetByUser} from './wishlistAPI'

const initialState = {     
    array: [],    
    item: {
        _id: null,
        name: null,
    },
    productsArray: [],
};


export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        wishlistResetStore: () => {
            return initialState
        },
        selectedItemWishlist: (state, action) => {
            return {
                ...state,
                item: action.payload
            }
        },
        addWish: (state, action) => {
            return { 
                ...state,
                array: [...state.array, action.payload]
            }
        },
        getWishlist: (state, action) => {
            state.array = action.payload
        },
        getWishProducts: (state, action) => {
            state.productsArray = action.payload
        }
    },
});

export const { selectedItemWishlist, wishlistResetStore, addWish, getWishlist, getWishProducts } = wishlistSlice.actions;

export default wishlistSlice.reducer;

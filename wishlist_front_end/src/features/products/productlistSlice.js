import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {     
    array: [],
    item: {
        _id: null,
        name : null,
        description: null,
        currency: null,
        price: null,
        status: null,
        img: null,
        wish: null,
    },
};

export const productlistSlice = createSlice({
    name: 'productlist',
    initialState,
    reducers: {
        productlistResetStore: () => {
            return initialState
        },
        selectedItemProductlist: (state, action) => {
            return {
                ...state,
                item: action.payload
            }
        },
        getProducts: (state, action) => {
            state.array = action.payload
        },
        addProduct: (state, action) => {
            return { 
                ...state,
                array: [...state.array, action.payload]
            }
        },
    },
});

export const { selectedItemProductlist, productlistResetStore, getProducts, addProduct } = productlistSlice.actions;

export default productlistSlice.reducer;

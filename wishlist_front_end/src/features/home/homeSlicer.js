import { createSlice } from '@reduxjs/toolkit';

const initialState = {  
    usdRatio: null,   
    tndRatio: null,
    selectedCurrency: 'TND',
}



export const homeSlicer = createSlice({
    name: 'home',
    initialState,
    reducers: {
        currencyRatio: (state, action) => {
            state.usdRatio = action.payload.USD
            state.tndRatio = action.payload.TND
        },
        selectedCurrency: (state, action) =>{
            console.log('%chomeSlicer.js line:20 action.payload', 'color: #26bfa5;', action.payload);
            return { ...state, selectedCurrency: action.payload}
        }
    }
});


export const { currencyRatio, selectedCurrency } = homeSlicer.actions;


export default homeSlicer.reducer;
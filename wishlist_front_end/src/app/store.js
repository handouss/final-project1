import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/login/loginSlice';
import signupReducer from '../features/signup/signUpSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice';
import productlistReducer from '../features/products/productlistSlice';
import homeReducer from '../features/home/homeSlicer'



export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: loginReducer,
    signup: signupReducer,
    wishlist: wishlistReducer,
    productlist: productlistReducer,
    home: homeReducer,
  },
});

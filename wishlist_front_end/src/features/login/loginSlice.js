import { createSlice } from '@reduxjs/toolkit';

import {useSelector} from "react-redux";
const initialState = {
  _id: null,
  name: '',
  password: '',
  img: '',
}



export const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state._id = action.payload._id
      state.token = action.payload.token
      state.name = action.payload.name
      state.password = action.payload.password
      state.img = action.payload.img
    }
  }
});


export const { login } = loginSlice.actions;


export default loginSlice.reducer;

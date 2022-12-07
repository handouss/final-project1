import { createAsyncThunk } from '@reduxjs/toolkit';


export const SignUpAsync = createAsyncThunk(
  'signup',
  async (data) => {
      console.log("sinup data   ", data)
  }
);


export default SignUpAsync.reducer;
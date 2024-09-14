import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userDetails",
  initialState: {
      username: localStorage.getItem('username') || '', // Check localStorage
      useremail: localStorage.getItem('useremail') || '', // Check localStorage 
  },
  reducers: {
    userData:(state,action)=>{
        state.username=action.payload.name;
        state.useremail=action.payload.email;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice;
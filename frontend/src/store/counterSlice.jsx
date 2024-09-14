import { createSlice } from "@reduxjs/toolkit";
// import counterSlice from "./counterSlice";
// # 1 define a slice
const counterSlice = createSlice({
  name: "countes",
  initialState: { counterVal: 0 },
  reducers: {
    INC: (state, action) => {
      // state contains wherever defined in initialState
      console.log(action);
      state.counterVal += action.payload;
    },
    DEC: (state, action) => {
      state.counterVal--;
    },
  },
});

export const counterActions = counterSlice.actions;
export default counterSlice;

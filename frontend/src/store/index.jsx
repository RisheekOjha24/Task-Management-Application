import {configureStore,createSlice} from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import userSlice from "./userDetails";

    const Store= configureStore({
        reducer:{
            counter:counterSlice.reducer,
            userData:userSlice.reducer
        }
    })

export default Store;
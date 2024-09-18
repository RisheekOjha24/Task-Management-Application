import {configureStore,createSlice} from "@reduxjs/toolkit";
import userSlice from "./userDetails";

    const Store= configureStore({
        reducer:{
            userData:userSlice.reducer
        }
    })

export default Store;
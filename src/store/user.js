import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";


export const sendLogin = createAsyncThunk("LOGIN",()=>{
    return
})


const userReducer = createReducer([],{
/* [sendLoginRequest.fulfilled]: (state,action) => action.payload,
[sendLogoutRequest.fulfilled]: (state,action) => action.payload, */
})

export default userReducer
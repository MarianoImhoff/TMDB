import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger"

import userReducer from "./user"
import favoriteReducer from "./favorite"

const store = configureStore({
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer:{
        user : userReducer,
        favorite : favoriteReducer
    }
});

export default store;
import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const addFavorite = createAsyncThunk("ADD_FAVORITES", (addFavorites) => {
  const { code, titulo, path, overview, userId } = addFavorites;
  return axios.put("http://localhost:8080/api/favoritos/add", {
    code, titulo, path, overview, userId})
    .then(res=> {
      if(res.data === "Already added"){
        alert(res.data)
      }
    }) 
});

export const removeFavorites = createAsyncThunk(
  "REMOVE_FAVORITES",
  (removeFavorites) => {
    const { code, titulo, path, overview, userId } = removeFavorites;
    return axios.delete("http://localhost:8080/api/favoritos/remove", {
      data: {titulo, code, path, overview, userId}});
  }
);

const favoriteReducer = createReducer([], {
  [addFavorite.fulfilled]: (state, action) => action.payload,
  [removeFavorites.fulfilled]: (state, action) => action.payload,
});

export default favoriteReducer;

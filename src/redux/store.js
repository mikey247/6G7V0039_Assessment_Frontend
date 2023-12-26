import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import authReducer from "./authRedux";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});

export default store;

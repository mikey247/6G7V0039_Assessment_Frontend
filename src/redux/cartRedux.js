//
import { createSlice } from "@reduxjs/toolkit";

// Load state from local storage
const savedState = localStorage.getItem("cartState");
const initialState = savedState ? JSON.parse(savedState) : {
  products: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.products.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.products.push(action.payload);
        state.quantity++;
      } else {
        existingItem.quantity = existingItem.quantity + action.payload.quantity;
      }
      state.total += action.payload.price * action.payload.quantity; //quantity of products being added, not cart quantity

      // Save state to local storage
      localStorage.setItem("cartState", JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.products.find((item) => item.id === id);
      state.total -= existingItem.price;
      // existingItem.quantity--
      if (existingItem.quantity === 1) {
        state.products = state.products.filter((item) => item.id !== id);
        state.quantity--;
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }

      // Save state to local storage
      localStorage.setItem("cartState", JSON.stringify(state));
    },
    //
  },
});


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;

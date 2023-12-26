import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    token: localStorage.getItem("token"),
    isLoggedIn: localStorage.getItem("isLoggedIn"),
    userId: localStorage.getItem("userId"),
    userEmail: localStorage.getItem("email"),
    userFirstName: localStorage.getItem("firstName"),
    // isAdmin: false,
  },

  reducers: {
    register: () => {},
    login: (state, action) => {
      //
      if (action.payload.token) {
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);

        state.isLoggedIn = true;
        localStorage.setItem("isLoggedIn", true);
      }
      //
      state.userId = action.payload.user.id;
      localStorage.setItem("userId", action.payload.user.id);

      state.userEmail = action.payload.user.email;
      localStorage.setItem("email", action.payload.user.email);

      state.userFirstName = action.payload.user.firstName;
      localStorage.setItem("firstName", action.payload.user.firstName);
      //   state.isAdmin = action.payload.user.isAdmin;
    },
    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      localStorage.removeItem("fullName");
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;

// import { createSlice } from "@reduxjs/toolkit";

// const userFromStorage = localStorage.getItem("Authorization");

// const initialState = {
//   user: userFromStorage ? JSON.parse(userFromStorage) : null,
//   isLoggedIn: userFromStorage !== null,
// };
// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       state.isLoggedIn = true;
//       localStorage.setItem("user", JSON.stringify(action.payload));
//     },

//     logoutUser: (state) => {
//       state.user = null;
//       state.isLoggedIn = false;
//       localStorage.removeItem("user");
//       localStorage.removeItem("Authorization");
//     },
//   },
// });

// export const { setUser, logoutUser } = userSlice.actions;
// export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

let userFromStorage = null;

try {
  const storedUser = localStorage.getItem("user");
  userFromStorage = storedUser ? JSON.parse(storedUser) : null;
} catch {
  localStorage.removeItem("user");
}

const initialState = {
  user: userFromStorage,
  isLoggedIn: !!userFromStorage,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("user");
      localStorage.removeItem("Authorization");
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

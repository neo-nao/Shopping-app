import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobileMenuOpened: false,
};

const elementSlice = createSlice({
  name: "elements",
  initialState,
  reducers: {
    toggleMobileMenu: (state, action) => {
      state.isMobileMenuOpened = action.payload ?? !state.isMobileMenuOpened;
    },
  },
});

export const { toggleMobileMenu } = elementSlice.actions;

export default elementSlice.reducer;

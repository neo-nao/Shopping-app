import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowing: false,
  title: "",
  paragraph: "",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, { payload: { title, paragraph } }) => {
      state.title = title;
      state.paragraph = paragraph;
      state.isShowing = true;
    },
    hideAlert: (state) => {
      state.isShowing = false;
      state.title = "";
      state.paragraph = "";
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;

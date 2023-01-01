import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowing: false,
  title: "",
  paragraph: "",
  removable: true,
  delay: 0,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (
      state,
      { payload: { title, paragraph, removable = true, delay } }
    ) => {
      state.title = title;
      state.paragraph = paragraph;
      state.removable = removable;

      if (delay && delay !== 0) state.delay = delay;
      else state.delay = 0;

      if (state.delay !== 0) {
      } else {
        state.isShowing = true;
      }
    },
    hideAlert: (state, { payload }) => {
      if (payload && payload.delay) state.delay = payload.delay;
      else state.delay = 0;

      if (state.delay !== 0) {
      } else {
        state.isShowing = false;
      }
      state.title = "";
      state.paragraph = "";
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;

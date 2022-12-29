import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowing: false,
  title: "",
  paragraph: "",
  delay: 0,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, { payload: { title, paragraph, delay } }) => {
      state.title = title;
      state.paragraph = paragraph;

      if (delay && delay !== 0) state.delay = delay;
      else state.delay = 0;

      if (state.delay !== 0) {
        const timeout = setTimeout(() => (state.isShowing = true), state.delay);

        clearTimeout(timeout);
      } else state.isShowing = true;
    },
    hideAlert: (state, { payload }) => {
      if (payload && payload.delay) state.delay = payload.delay;
      else state.delay = 0;

      if (state.delay !== 0) {
        const timeout = setTimeout(
          () => (state.isShowing = false),
          state.delay
        );

        clearTimeout(timeout);
      } else state.isShowing = false;
      state.title = "";
      state.paragraph = "";
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;

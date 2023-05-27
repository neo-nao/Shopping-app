import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowing: false,
  title: "",
  paragraph: "",
  removable: true,
  onRemove: null,
  delay: 0,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (
      state,
      {
        payload: { title, paragraph, removable = true, onRemove = null, delay },
      }
    ) => {
      state.title = title;
      state.paragraph = paragraph;
      state.removable = removable;
      state.onRemove = onRemove;

      if (delay && delay > 0) state.delay = delay;
      else state.delay = 0;

      if (state.delay > 0) {
        setTimeout(() => (state.isShowing = true), delay);
      } else {
        state.isShowing = true;
      }
    },
    hideAlert: () => {
      return initialState;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;

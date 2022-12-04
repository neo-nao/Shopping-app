import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    email: "",
    password: "",
  },
  signup: {
    name: "",
    lastName: "",
    email: "",
    password: "",
  },
};

const authFormSlice = createSlice({
  name: "authForm",
  initialState,
  reducers: {
    setFormValue(state, { payload: { actionKey, propKey, value } }) {
      state[actionKey][propKey] = value;
    },
    clearValues(state) {
      state.login = initialState.login;
      state.signup = initialState.signup;
    },
  },
});

export const { setFormValue, clearValues } = authFormSlice.actions;
export default authFormSlice.reducer;

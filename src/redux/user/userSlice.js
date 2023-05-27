import { createSlice } from "@reduxjs/toolkit";
import { random } from "../../utils/appUtils";
import datas from "../../data/datas";

const initialState = {
  user: null,
  loginStatus: null,
};

const findItem = (itemId) => {
  return datas.products.find((p) => p.id === itemId);
};

const saveData = (data) => {
  localStorage.setItem("user-account", JSON.stringify(data));
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      saveData({ ...state.user, isLogged: false });
      return initialState;
    },
    login(state, { payload: { email, password } }) {
      const acc = JSON.parse(localStorage.getItem("user-account"));

      if (
        acc &&
        email.toLowerCase() === acc.email.toLowerCase() &&
        password === acc.password
      ) {
        saveData({ ...acc, isLogged: true });
        return { user: acc, loginStatus: "success" };
      } else state.loginStatus = "fail";
    },
    clearLoginStatus(state) {
      state.loginStatus = null;
    },
    createAccount(state, action) {
      const userAccount = {
        ...action.payload,
        userId: random.createRandomString(),
        createdAt: Date.now() + "",
        isLogged: true,
        cart: { items: [] },
      };
      saveData(userAccount);
      return { user: userAccount, loginStatus: "success" };
    },
    addItem(state, { payload: { itemId, itemColor } }) {
      const { colors, ...item } = findItem(itemId);
      state.user.cart.items.push({ ...item, color: itemColor, quantity: 1 });
      saveData({ ...state.user });
    },
    removeItem(state, action) {
      state.user.cart.items = state.user.cart.items.filter(
        (item) => item.id !== action.payload
      );
      saveData({ ...state.user });
    },
    setQuantity(state, action) {
      state.user.cart.items.find(
        (i) => i.id === action.payload.itemId
      ).quantity = action.payload.newQuantity;
      saveData({ ...state.user });
    },
  },
});

export const {
  logout,
  login,
  clearLoginStatus,
  createAccount,
  addItem,
  removeItem,
  setQuantity,
} = userSlice.actions;

export default userSlice.reducer;

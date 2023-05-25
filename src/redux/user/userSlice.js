import { createSlice } from "@reduxjs/toolkit";
import { random } from "../../utils/appUtils";
import datas from "../../data/datas";

const initialState = {
  user: null,
};

const findItem = (itemId) => {
  return datas.products.find((p) => p.id === itemId);
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("user-account");
    },
    login(state, action) {
      state.user = action.payload;
    },
    createAccount(state, action) {
      const userAccount = {
        ...action.payload,
        userId: random.createRandomString(),
        createdAt: Date.now() + "",
        cart: { items: [] },
      };
      state.user = userAccount;
    },
    addItem(state, { payload: { itemId, itemColor } }) {
      const { colors, ...item } = findItem(itemId);
      state.user.cart.items.push({ ...item, color: itemColor });
    },
    removeItem(state, action) {
      state.user.cart.items = state.user.cart.items.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { logout, login, createAccount, addItem, removeItem } =
  userSlice.actions;

export default userSlice.reducer;

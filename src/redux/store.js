import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import elementSlice from "./elements/elementSlice";
import productsSlice from "./prodcuts/productsSlice";
import alertSlice from "./alert/alertSlice";
import authFormSlice from "./authFormValues/authFormSlice";
import specialOffersSlice from "./specialOffers/specialOffersSlice";

const store = configureStore({
  reducer: {
    products: productsSlice,
    specialOffers: specialOffersSlice,
    user: userSlice,
    elements: elementSlice,
    alert: alertSlice,
    authForm: authFormSlice,
  },
});

export default store;

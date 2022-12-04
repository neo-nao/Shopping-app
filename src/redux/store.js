import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./sagas/rootSaga";
import userSlice from "./user/userSlice";
import elementSlice from "./elements/elementSlice";
import productsSlice from "./prodcuts/productsSlice";
import alertSlice from "./alert/alertSlice";
import authFormSlice from "./authFormValues/authFormSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    products: productsSlice,
    user: userSlice,
    elements: elementSlice,
    alert: alertSlice,
    authForm: authFormSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;

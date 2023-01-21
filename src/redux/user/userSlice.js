import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hideAlert, showAlert } from "../../redux/alert/alertSlice";
import { fetchFunc, postFunc, putFunc } from "../../services/requestServices";
import { clearValues } from "../authFormValues/authFormSlice";

const usersURL = "/users";
const userCartURL = "/usersCart";

const asyncFetchUserCart = createAsyncThunk(
  "users/fetchUserCart",
  async (payload, { rejectWithValue }) => {
    try {
      const userOwnedItems =
        (await fetchFunc(`/usersCart?userToken=${payload}`)) || [];

      return await userOwnedItems.map(({ id, productID, quantity }) => {
        return { id, productID, quantity };
      });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const asyncPostUserItem = createAsyncThunk(
  "users/postUserItem",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await postFunc(userCartURL, { ...data, quantity: 1 });

      return response;
    } catch (err) {
      dispatch(showAlert({ title: "Error", paragraph: err }));
      return rejectWithValue([], err);
    }
  }
);

const asyncUserFetch = createAsyncThunk(
  "users/fetchByUserCredentials",
  async (params, { rejectWithValue, dispatch }) => {
    try {
      let url;
      if (params.email && params.password) {
        url = `${usersURL}?email=${params.email.toLowerCase()}&password=${
          params.password
        }`;
      } else if (params.UTK) {
        url = usersURL + "?userToken=" + params.UTK;
      }

      const data = await fetchFunc(url);

      const userData = Array.isArray(data) ? data[0] ?? null : data ?? null;

      if (!userData) {
        const timeout = setTimeout(() => {
          dispatch(hideAlert());
          setTimeout(() => {
            clearInterval(timeout);
            dispatch(
              showAlert({
                title: "Failed to Login!",
                paragraph:
                  "The entered credentials are incorrect, please correct them and try loggin again",
              })
            );
          }, 520);
        }, 250);
      } else {
        dispatch(asyncFetchUserCart(userData.userToken));
        params.email && params.password && dispatch(clearValues());
      }
      return userData;
    } catch (err) {
      console.error(err);
      return rejectWithValue([], err);
    }
  }
);

let quantityProcessLoading = false;

const asyncQuantityHandler = createAsyncThunk(
  "user/quantityHandler",
  async ({ newValue, product, userToken }, { dispatch }) => {
    quantityProcessLoading = true;
    try {
      await putFunc("/usersCart/" + product.id, {
        ...product,
        quantity: newValue,
        userToken,
      });

      return { newValue, product };
    } catch (err) {
      dispatch(
        showAlert({
          title: "Error",
          paragraph: "There was an error with this detail :\n" + err,
        })
      );
    } finally {
      quantityProcessLoading = false;
    }
  }
);

const initialState = {
  requestStatus: { loading: false, error: null },
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
    removeUserItemPending(state) {
      state.requestStatus.loading = true;
    },
    removeUserItemFulfilled(state, action) {
      state.requestStatus.loading = false;
      state.user.cart.items = state.user.cart.items.filter(
        (item) => item.productID !== action.payload.productID
      );
    },
    removeUserItemRejected(state, action) {
      state.requestStatus.loading = false;
      state.requestStatus.error = action.error.message;
    },
    createUserAccountPending(state) {
      state.requestStatus.loading = true;
    },
    createUserAccountFulfilled(state, action) {
      state.requestStatus.loading = false;
      state.user = action.payload;
    },
    createUserAccountRejected(state, action) {
      state.requestStatus.loading = false;
      state.requestStatus.error = action.error.message;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(asyncUserFetch.pending, (state) => {
        state.requestStatus.loading = true;
      })
      .addCase(asyncUserFetch.fulfilled, (state, action) => {
        state.requestStatus.loading = false;
        state.user = action.payload;
      })
      .addCase(asyncUserFetch.rejected, (state, action) => {
        state.requestStatus.loading = false;
        state.requestStatus.error = action.error;
      })
      .addCase(
        asyncPostUserItem.fulfilled,
        (state, { payload: { id, productID, quantity } }) => {
          state.user.cart.items.push({
            id,
            productID,
            quantity,
          });
        }
      )
      .addCase(asyncFetchUserCart.pending, (state) => {
        if (state.user) state.user.cart.requestStatus.loading = true;
      })
      .addCase(asyncFetchUserCart.fulfilled, (state, action) => {
        if (state.user) {
          state.user.cart.items = action.payload;
          state.user.cart.requestStatus.loading = false;
        }
      })
      .addCase(asyncFetchUserCart.rejected, (state, action) => {
        if (state.user) {
          state.user.cart.requestStatus.error = action.payload.errorMessage;
          state.user.cart.requestStatus.loading = false;
        }
      })
      .addCase(
        asyncQuantityHandler.fulfilled,
        (state, { payload: { newValue, product } }) => {
          state.user.cart.items.find((i) => i.id === product.id).quantity =
            newValue;
        }
      ),
});

export const {
  logout,
  removeUserItemPending,
  removeUserItemFulfilled,
  removeUserItemRejected,
  createUserAccountPending,
  createUserAccountFulfilled,
  createUserAccountRejected,
} = userSlice.actions;

export {
  asyncUserFetch,
  asyncFetchUserCart,
  asyncPostUserItem,
  asyncQuantityHandler,
  quantityProcessLoading,
};

export default userSlice.reducer;

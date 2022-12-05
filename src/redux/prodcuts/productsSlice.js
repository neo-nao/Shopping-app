import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFunc } from "../../services/requestServices";
import { showAlert } from "../alert/alertSlice";

const productsURL = "/products";

export const getAsyncProducts = createAsyncThunk(
  "products/fetchByIdStatus",
  async (param, { rejectWithValue, dispatch }) => {
    const url = param ? productsURL + param : productsURL;

    const response = await fetchFunc(url);

    if (response.errorMessage) {
      dispatch(
        showAlert({
          title: "Error",
          paragraph: response.errorMessage,
        })
      );
      return rejectWithValue([], response.errorMessage);
    }

    return response;
  }
);

const initialState = {
  loading: false,
  error: null,
  products: null,
  filteredOptions: {
    category: [],
    type: [],
    color: [],
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterProducts: (state, action) => {
      const currentFilterBox = state.filteredOptions[action.payload.tagKey];
      const actionValue = action.payload.tagValue;

      !currentFilterBox.includes(actionValue)
        ? currentFilterBox.push(actionValue)
        : (state.filteredOptions[action.payload.tagKey] =
            currentFilterBox.filter((filterVal) => filterVal !== actionValue));
    },
    clearFilter: (state, action) => {
      state.filteredOptions[action.payload] = [];
    },
  },
  extraReducers: {
    [getAsyncProducts.pending]: (state) => {
      state.loading = true;
    },
    [getAsyncProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [getAsyncProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const { filterProducts, clearFilter } = productsSlice.actions;
export default productsSlice.reducer;
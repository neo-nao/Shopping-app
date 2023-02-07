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
    resetFilter: (state) => {
      state.filteredOptions = initialState.filteredOptions;
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAsyncProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAsyncProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      });
  },
});

export const { filterProducts, clearFilter, resetFilter } =
  productsSlice.actions;
export default productsSlice.reducer;

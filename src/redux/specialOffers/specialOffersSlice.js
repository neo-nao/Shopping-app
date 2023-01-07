import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showAlert } from "../alert/alertSlice";
import { fetchFunc } from "../../services/requestServices";

const specialOffersURL = "/products?isDiscount=true";

const getAsyncSpecialOffers = createAsyncThunk(
  "specialOffers/fetch",
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const url = params
        ? specialOffersURL + params.replace("?", "&")
        : specialOffersURL;

      const response = await fetchFunc(url);

      return response;
    } catch (err) {
      dispatch(
        showAlert({
          title: "Error",
          paragraph: err,
        })
      );
      rejectWithValue([], err);
    }
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

const specialOffersSlice = createSlice({
  name: "specialOffers",
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
      state.products = initialState.products;
    },
  },
  extraReducers: {
    [getAsyncSpecialOffers.pending]: (state) => {
      state.loading = true;
    },
    [getAsyncSpecialOffers.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [getAsyncSpecialOffers.rejected]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
  },
});

export { getAsyncSpecialOffers };
export const { filterProducts, clearFilter, resetFilter } =
  specialOffersSlice.actions;
export default specialOffersSlice.reducer;

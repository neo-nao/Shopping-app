import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import datas from "../../data/datas";

const getFilteredProducts = (params) => {
  let filteredProducts = [];
  for (const param of params) {
    const filteredItems = datas.products.filter((p) => {
      return (
        p.isDiscount &&
        (param[0] === "color"
          ? p.colors.includes(param[1])
          : p[param[0]] === param[1])
      );
    });

    filteredProducts.push(...filteredItems);
  }

  return filteredProducts.filter((fp, index, arr) => {
    return index === arr.findIndex((p) => p.id === fp.id);
  });
};

const getAsyncSpecialOffers = createAsyncThunk(
  "specialOffers/fetch",
  async (params, { rejectWithValue, dispatch }) => {
    return params
      ? getFilteredProducts(params)
      : datas.products.filter((p) => p.isDiscount);
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
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncSpecialOffers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAsyncSpecialOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAsyncSpecialOffers.rejected, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      });
  },
});

export { getAsyncSpecialOffers };
export const { filterProducts, clearFilter, resetFilter } =
  specialOffersSlice.actions;
export default specialOffersSlice.reducer;

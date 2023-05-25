import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import datas from "../../data/datas";

const getFilteredProducts = (params) => {
  let filteredProducts = [];
  for (const param of params) {
    const filteredItems = datas.products.filter((p) => {
      return param[0] === "color"
        ? p.colors.includes(param[1])
        : p[param[0]] === param[1];
    });

    filteredProducts.push(...filteredItems);
  }

  return filteredProducts.filter((fp, index, arr) => {
    return index === arr.findIndex((p) => p.id === fp.id);
  });
};

export const getAsyncProducts = createAsyncThunk(
  "products/fetchByIdStatus",
  (param, { rejectWithValue, dispatch }) => {
    return param ? getFilteredProducts(param) : datas.products;
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

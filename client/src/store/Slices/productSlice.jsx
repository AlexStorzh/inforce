import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

export const SORT = {
  BY_NAME: "BY_NAME",
  BY_COUNT: "BY_COUN",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async function () {
    const response = await fetch("http://localhost:3001/products");
    const data = await response.json();
    return data;
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async function ({ ...product }) {
    const response = await axios.post(
      "http://localhost:3001/products",
      product
    );
    return response.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async function (productsId, { dispatch }) {
    const response = await axios.delete(
      `http://localhost:3001/products/${productsId}`
    );
    dispatch(productDelete(productsId));
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: null,
    sort: SORT.BY_NAME,
  },
  loading: "false",
  reducers: {
    addProduct(state, action) {
      state.products.push(action.payload);
    },
    productDelete(state, action) {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [fetchProducts.pending]: (state) => {
      state.status = true;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.products.push(action.payload);
    },
  },
});

export const selectProducts = (state) => state.product.products;
export const selectSort = (state) => state.product.sort;

export const selectProductsSortedByName = createSelector(
  [selectProducts, selectSort],
  (products, sort) => {
    const sortedProducts = [...products].sort((a, b) => a.name - b.name);
    return sortedProducts;
  }
);
export const selectProductsSortedByCount = createSelector(
  [selectProducts, selectSort],
  (products, sort) => {
    const sortedProducts = [...products].sort((a, b) => b.count - a.count);
    return sortedProducts;
  }
);

export const { addProduct, setSort, productDelete } = productSlice.actions;
export default productSlice.reducer;

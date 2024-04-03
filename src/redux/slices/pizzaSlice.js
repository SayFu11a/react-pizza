import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
   const { sortBy, order, category, search, currentPage } = params;
   const { data } = await axios.get(
      `https://6465cabb9c09d77a62f404da.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
   );
   return data;
});

const initialState = {
   items: [],
   status: 'loading', // loading | success | error
};

const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {
      setItem(state, action) {
         state.items = action.payload;
      },
   },
   extraReducers: {
      [fetchPizzas.pending]: (state) => {
         state.status = 'loading';
         state.items = [];
      },
      [fetchPizzas.fulfilled]: (state, action) => {
         state.items = action.payload;
         state.status = 'success';
      },
      [fetchPizzas.rejected]: (state, action) => {
         state.status = 'error';
         state.items = [];
      },
   },
});

// если будет ошибка после обновления редакс туллкит использовать этот код
// extraReducers: (builder) => {
//    builder
//       .addCase(fetchPizzas.pending, (state) => {
//          state.status = "loading"
//          state.items = []
//       })
//       .addCase(fetchPizzas.fulfilled, (state, action) => {
//          state.items = action.payload
//          state.status = "success"
//       })
//       .addCase(fetchPizzas.rejected, (state) => {
//          state.status = "error"
//          state.items = []
//       })
// }

// или этот

// extraReducers: (builder) => {
//    builder.addCase(fetchProducts.fulfilled, (state, action) => {
//      state.products = action.payload;
//    });

export const { setItem } = pizzaSlice.actions;

export default pizzaSlice.reducer;

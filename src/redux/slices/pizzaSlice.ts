import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';



type Pizza = {
   title: string, 
   price: string, 
   id: string, 
   imageUrl: string, 
   types: number[], 
   sizes: number[], 
   category: number, 
   rating: number,
}

export enum Status {
   LOADING = 'loading',
   SUCCESS = 'success',
   ERROR = 'error'
}

interface PizzaSliceState {
   items: Pizza[];
   status: Status;
}

const initialState: PizzaSliceState = {
   items: [],
   status: Status.LOADING, // loading | success | error
};

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>('pizza/fetchPizzasStatus', async (params) => {
   const { sortBy, order, category, search, currentPage } = params;
   const { data } = await axios.get<Pizza[]>(
      `https://6465cabb9c09d77a62f404da.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
   );
   return data;
});


const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {
      setItem(state, action: PayloadAction<Pizza[]>) {
         state.items = action.payload;
      },
   },

   extraReducers: (builder) => {
      builder.addCase(fetchPizzas.pending, (state, action) => {
         state.status = Status.LOADING;
         state.items = [];
      });
      builder.addCase(fetchPizzas.fulfilled, (state, action) => {
         state.items = action.payload;
         state.status = Status.SUCCESS;
      });
      builder.addCase(fetchPizzas.rejected, (state, action) => {
         state.status = Status.ERROR;
         state.items = [];
      });
   }
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

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItem } = pizzaSlice.actions;

export default pizzaSlice.reducer;

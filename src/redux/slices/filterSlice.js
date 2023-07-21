import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   categoryId: 0,
   currentPage: 1,
   sort: {
      name: 'популярности',
      sortProperty: 'rating',
   },
};

const filterSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      setCategoryId(state, action) {
         state.categoryId = action.payload;
      },
      setTypeSort(state, action) {
         state.sort = action.payload;
      },
      setCurrentPage(state, action) {
         state.currentPage = action.payload;
      },
      setFilltersUrl(state, action) {
         // параметры которые мы будем передавть сюда,будут вшиваться в свойства.
         state.currentPage = Number(action.payload.currentPage); // когда придет currentPage ты должен вшить то что придет из payload
         state.sort = action.payload.sort;
         state.categoryId = Number(action.payload.categoryId);
      },
   },
});

export const { setCategoryId, setTypeSort, setCurrentPage, setFilltersUrl } = filterSlice.actions;

export default filterSlice.reducer;

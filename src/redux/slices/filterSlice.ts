import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Sort = {
   name: string,
   sortProperty: string, // 'rating' | 'price'| 'title' | '-rating' | '-price'| '-title'
}

interface FilterSliceSatate {
   searchValue: string,
   categoryId: number,
   currentPage: number,
   sort: Sort,
}

const initialState: FilterSliceSatate = {
   searchValue: '',
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
      setCategoryId(state, action: PayloadAction<number>) {
         state.categoryId = action.payload;
      },
      setSearchValue(state, action: PayloadAction<string>) {
         state.searchValue = action.payload;
      },
      setTypeSort(state, action: PayloadAction<Sort>) {
         state.sort = action.payload;
      },
      setCurrentPage(state, action: PayloadAction<number>) {
         state.currentPage = action.payload;
      },
      setFilltersUrl(state, action: PayloadAction<FilterSliceSatate>) {
         // параметры которые мы будем передавть сюда,будут вшиваться в свойства.
         state.currentPage = Number(action.payload.currentPage); // когда придет currentPage ты должен вшить то что придет из payload
         state.sort = action.payload.sort;
         state.categoryId = Number(action.payload.categoryId);
      },
   },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;

export const { setCategoryId, setTypeSort, setCurrentPage, setFilltersUrl, setSearchValue } =
   filterSlice.actions;

export default filterSlice.reducer;

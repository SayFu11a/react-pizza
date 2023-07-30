import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   totalPrice: 0,
   items: [],
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      // addItem(state, action) {
      //    state.items.push(action.payload); // тут будем передавать целый объект
      //    state.totalPrice = state.items.reduce((sum, obj) => {
      //       return sum + obj.price; // рассчет стоимости пицц в корзине,в переменную sum сохраняются все изменения на каждой итерации
      //    }, 0);
      // },
      addItem(state, action) {
         const findItem = state.items.find((obj) => obj.id === action.payload.id); // ишем объект у которого id равен

         if (findItem) {
            findItem.count++; // найденному объекту делаем count++ // если этот участок кода отрабатывает значит у нас одинаковые пиццы и мы у них увеличиваем caunt на +1
         } else {
            state.items.push({
               ...action.payload, // бурем все что пришло в конец компонента
               count: 1, // в конец добовляем count: 1, то есть мы говорим что добавлен только один продукт
            });
         }
         // это логика вверху помогает не дублировать одинаковые пиццы, вместо этого если в корзину добавляются одинаковые пиццы, то у пицы этой увеличивается count
         state.totalPrice = state.items.reduce((sum, obj) => {
            return obj.price * obj.count + sum; // рассчет стоимости пицц в корзине,в переменную sum сохраняются все изменения на каждой итерации, затем умножаем на caunt так как он показывает сколько пиц такоого типа добавлено
         }, 0);
      },
      removeItem(state, action) {
         state.items = state.items.filter((obj) => obj.id !== action.payload); // тут будем передавать id
      },
      minusItem(state, action) {
         const findItem = state.items.find((obj) => obj.id === action.payload); // ишем объект у которого id равен

         if (findItem) {
            findItem.count--;
         }
      },
      clearItem(state) {
         state.items = [];
         state.totalPrice = 0;
      },
      // totalPriceSum(state, action) {
      //    state.totalPrice += action.payload.price;
      // },
   },
});

export const { addItem, removeItem, minusItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;

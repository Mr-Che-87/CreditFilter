import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filtersSlice';

//передаём в store редукторы:
export const store = configureStore({
  reducer: {
    creditFilter: filterReducer,   //creditFilter - имя слайса
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


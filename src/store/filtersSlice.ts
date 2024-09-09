import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  amount: number | null;
}

const initialState: FilterState = {
  amount: null,
};

const filterSlice = createSlice({
  name: 'creditFilter',
  initialState,
  reducers: {
    //редуктор фильтрации по сумме:
    setAmountFilter: (state, action: PayloadAction<number | null>) => { 
      state.amount = action.payload;
    },
  },
});

export const { setAmountFilter } = filterSlice.actions;
export default filterSlice.reducer;

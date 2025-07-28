import { createSlice } from '@reduxjs/toolkit';

const dateFormatSlice = createSlice({
  name: 'dateFormat',
  initialState: {
    format: 'Day/Month/Year',
  },
  reducers: {
    setDateFormat: (state, action) => {
      state.format = action.payload;
    },
  },
});

export const { setDateFormat } = dateFormatSlice.actions;
export default dateFormatSlice.reducer;

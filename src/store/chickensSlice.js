import { createSlice } from '@reduxjs/toolkit';

const chickensSlice = createSlice({
  name: 'chickens',
  initialState: {
    items: [],
  },
  reducers: {
    addChicken: (state, action) => {
      state.items.push({
        id: Date.now().toString(),
        productivity: [],
        ...action.payload,
      });
    },
    updateChicken: (state, action) => {
      const index = state.items.findIndex(
        (chicken) => chicken.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    addEggEntry: (state, action) => {
      const { chickenId, date, count } = action.payload;
      const chicken = state.items.find((c) => c.id === chickenId);
      if (!chicken) return;

      const existing = chicken.productivity.find((p) => p.date === date);
      if (existing) {
        existing.count = count;
      } else {
        chicken.productivity.push({ date, count });
      }
    },
  },
});

export const { addChicken, updateChicken, addEggEntry } = chickensSlice.actions;
export default chickensSlice.reducer;
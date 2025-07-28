import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notificationsEnabled: true, 
  items: {
    feeding: [],
    cleaning: [],
    health: [],
  },
};

const remindersSlice = createSlice({
  name: 'reminders',
  initialState,
  reducers: {
    addReminder: (state, action) => {
      const { category, reminder } = action.payload;
      state.items[category].push({ id: Date.now().toString(), ...reminder });
    },
    removeReminder: (state, action) => {
      const { category, id } = action.payload;
      state.items[category] = state.items[category].filter(r => r.id !== id);
    },
    setNotificationsEnabled: (state, action) => {
      state.notificationsEnabled = action.payload; 
    },
  },
});

export const {
  addReminder,
  removeReminder,
  setNotificationsEnabled,
} = remindersSlice.actions;

export default remindersSlice.reducer;

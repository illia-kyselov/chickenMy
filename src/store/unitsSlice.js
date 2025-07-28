import { createSlice } from '@reduxjs/toolkit';

const unitsSlice = createSlice({
    name: 'units',
    initialState: {
        type: 'pieces',
    },
    reducers: {
        setUnits: (state, action) => {
            state.type = action.payload;
        },
    },
});

export const { setUnits } = unitsSlice.actions;
export default unitsSlice.reducer;

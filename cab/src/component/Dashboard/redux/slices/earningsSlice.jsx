import { createSlice } from "@reduxjs/toolkit";

const earningsSlice = createSlice({
    name: "earnings",
    initialState: { total: 10000 }, // Example earnings
    reducers: {
        updateEarnings: (state, action) => {
            state.total += action.payload;
        },
    },
});

export const { updateEarnings } = earningsSlice.actions;
export default earningsSlice.reducer;

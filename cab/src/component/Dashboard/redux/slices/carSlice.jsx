import { createSlice } from "@reduxjs/toolkit";

const carSlice = createSlice({
    name: "cars",
    initialState: { items: [{ id: 1, name: "Toyota Camry", price: 50 }] },
    reducers: {
        addCar: (state, action) => {
            state.items.push(action.payload);
        },
    },
});

export const { addCar } = carSlice.actions;
export default carSlice.reducer;

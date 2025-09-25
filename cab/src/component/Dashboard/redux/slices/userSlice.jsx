import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: {
        items: [
            { id: 1, name: "John Doe", joinedToday: true },
            { id: 2, name: "Jane Smith", joinedToday: false },
        ],
    },
    reducers: {
        addUser: (state, action) => {
            state.items.push(action.payload);
        },
    },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;

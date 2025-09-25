import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBookings = createAsyncThunk("bookings/fetchBookings", async () => {
    const response = await axios.get("/api/bookings");
    return response.data;
});

const bookingSlice = createSlice({
    name: "bookings",
    initialState: { bookings: [], status: "idle" },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.pending, (state) => { state.status = "loading"; })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.bookings = action.payload;
            })
            .addCase(fetchBookings.rejected, (state) => { state.status = "failed"; });
    },
});

export default bookingSlice.reducer;

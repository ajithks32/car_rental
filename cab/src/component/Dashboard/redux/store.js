import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./slices/carSlice";
import bookingReducer from "./slices/bookingSlice";
import userReducer from "./slices/userSlice";
import earningsReducer from "./slices/earningsSlice"; // ✅ Correct import

const store = configureStore({
    reducer: {
        cars: carReducer,
        bookings: bookingReducer,
        users: userReducer,
        earnings: earningsReducer, // ✅ Correct name
    },
});

export default store;

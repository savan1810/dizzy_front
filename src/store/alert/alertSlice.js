import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    success: null,
    error: null,
    loading: false
}

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        setLoader: (state, action) => {
            state.loading = action.payload
        },
        setSuccessAlert: (state, action) => {
            state.success = action.payload;
            state.error = null;
            state.loading = false
        },
        setErrorAlert: (state, action) => {
            state.success = null;
            state.error = action.payload;
            state.loading = false
        },
        clearAlerts: (state) => {
            state.success = null;
            state.error = null;
            state.loading = false
        },
    }
})

export const { setLoader, setSuccessAlert, setErrorAlert, clearAlerts } = alertSlice.actions;

export default alertSlice.reducer;

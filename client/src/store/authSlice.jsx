import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token') || null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        removeToken: (state) => {
            state.token = null;
            localStorage.clear();
        },
    },
});

export const { setToken, removeToken } = authSlice.actions;

export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;

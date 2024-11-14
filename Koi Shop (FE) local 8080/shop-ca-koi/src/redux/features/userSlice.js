import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => action.payload, // action.payload = thông tin user
        logout: () => initialState, // reset về null khi logout
    },
});


export const { login, logout } = userSlice.actions;
export default userSlice.reducer;



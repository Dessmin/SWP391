import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/user";

const initialState: null | User = null;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => action.payload,//action.payload = thông tin user
        logout: () => initialState,//đại diện cho null
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
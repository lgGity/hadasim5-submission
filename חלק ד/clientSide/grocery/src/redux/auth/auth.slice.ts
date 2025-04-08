import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Supplier } from "../../types/supplier.types";

type AuthStateType = {
    user: Supplier | null,
    isAuthanticated: boolean,
    isInitialized: boolean
}

const initialState = {
    user: {}as Supplier,
    isAuthanticated: false,
    isInitialized: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state: AuthStateType, action: PayloadAction<Supplier>) => {
            state.user = action.payload;
            state.isAuthanticated = true;
            state.isInitialized = true;
        },
        setInitialize: (state: AuthStateType) => {
            state.isInitialized = true
        },
        logout: (state: AuthStateType) => {
            state.user = null;
            state.isAuthanticated = false;
          },
    }
})

export const { setUser, setInitialize,logout } = authSlice.actions

export default authSlice.reducer
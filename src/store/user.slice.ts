import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadState} from "./storage.ts";

export interface UserState {
    jwt: string | null;
}

export const JWT_PERSISTENT_STATE = 'userData';

const initialState: UserState = {
    jwt: loadState<string | null >(JWT_PERSISTENT_STATE) ?? null
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addJwt: (state, action: PayloadAction<string>) => {
            console.log('action.payload', action.payload)
            state.jwt = action.payload;
        },
        logout: (state) => {
            state.jwt = null;
        }
    }
})

export const userActions = userSlice.actions;

export default userSlice.reducer;
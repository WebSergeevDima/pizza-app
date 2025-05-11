import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadState} from "./storage.ts";
import axios from "axios";
import {LoginResponse} from "../interfaces/auth.interface.ts";
import {PREFIX} from "../helpers/API.ts";
import {userProfile} from "../interfaces/userProfile.interface.ts";
import {RootStateType} from "./store.ts";

export interface UserState {
    jwt: string | null;
    loginState: null | 'rejected',
    loginErrorMessage?: string,
    userProfile: userProfile | null
}

export const JWT_PERSISTENT_STATE = 'userData';

const initialState: UserState = {
    jwt: loadState<UserState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
    loginState: null,
    loginErrorMessage: undefined,
    userProfile: null
}


export const login = createAsyncThunk('user/login', async (params: { email: string, password: string }) => {
    const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        email: params.email,
        password: params.password
    })

    return data;
});

export const getProfile = createAsyncThunk<userProfile, void, {state: RootStateType}>('user/getProfile', async (_, thunkAPI) => {
    const jwt = thunkAPI.getState().user.jwt;

    const {data} = await axios.post<userProfile>(`${PREFIX}/user/profile`, {
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    })

    return data;
});

export const register = createAsyncThunk('user/registration', async (params: { email: string, password: string, name: string }) => {
    const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/register`, {
        email: params.email,
        password: params.password,
        name: params.name
    })

    return data;
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addJwt: (state, action: PayloadAction<string>) => {
            state.jwt = action.payload;
        },
        logout: (state) => {
            state.jwt = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.jwt = action.payload.access_token;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loginErrorMessage = action.error.message;
        })
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.userProfile = action.payload
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.jwt = action.payload.access_token;
        })
    }
})

export const userActions = userSlice.actions;
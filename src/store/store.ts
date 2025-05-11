import {configureStore} from "@reduxjs/toolkit";
import {JWT_PERSISTENT_STATE, userSlice} from "./user.slice.ts";
import {saveState} from "./storage.ts";
import {cartSlice} from "./cart.slice.ts";
import {productsSlice} from "./products.slice.ts";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        cart: cartSlice.reducer,
        products: productsSlice.reducer
    }
});

store.subscribe(() => {
    saveState({
        jwt: store.getState().user.jwt
    }, JWT_PERSISTENT_STATE);
})

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
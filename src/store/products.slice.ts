import {createSlice, PayloadAction} from "@reduxjs/toolkit";
export interface ProductsState {
    filter: string
}

const initialState: ProductsState = {
    filter: ''
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addQuery: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        }
    }
})

export const productsActions = productsSlice.actions;
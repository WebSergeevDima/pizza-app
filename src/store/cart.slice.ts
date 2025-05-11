import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface CartItem {
    id: number,
    count: number
}

export interface CartState {
    items: CartItem[]
}

const initialState: CartState = {
    items: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<number>) => {
            const existed = state.items.find((item: CartItem) => item.id === action.payload);

            if (!existed) {
                state.items.push({
                    id: action.payload,
                    count: 1
                })
            } else {

                state.items.forEach(item => {
                    if(item.id === action.payload) {
                        item.count = item.count + 1;
                    }
                })
            }

        }
    }
})

export const cartActions = cartSlice.actions;
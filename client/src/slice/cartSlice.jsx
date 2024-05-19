import { createSlice } from "@reduxjs/toolkit"

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        shippingInfo: {},
    },
    reducers: {
        ADD_TO_CART: (state, action) => {
            const item = action.payload;
            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            );

            if (isItemExist) {
                {
                    state.cartItems = state.cartItems.map((i) =>
                        i.product === isItemExist.product ? item : i
                    )
                }
            }
            else {
                {
                    state.cartItems.push(item);

                }
            }
        },
        REMOVE_CART_ITEM: (state, action) => {
            { state.cartItems = state.cartItems.filter((i) => i.product !== action.payload) }
        },
        SAVE_SHIPPING_INFO: (state, action) => {
            state.shippingInfo = action.payload;
        }
    }
})

export const cartReducer = cartSlice.reducer

export const { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } = cartSlice.actions
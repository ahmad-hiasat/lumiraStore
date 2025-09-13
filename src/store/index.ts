import { configureStore } from "@reduxjs/toolkit"
// import authReducer from "../features/auth/authSlice"
import registerReducer from "../features/auth/RegisterSlice"
import activateReducer from "../features/auth/ActivateSlice"
import LoginReducer from "../features/auth/LoginSlice"
import productsReducer from "../features/Products/ProductsSlice";
import AddProductsReducer from "../features/Products/addProductsSlice";
import SingleProductSlice from "../features/SingleProduct/singleProductSlice";
import userSlice from "../features/userData/userDataSlice";
import cartReducer from "../features/cart/cartSlice";

export const Store = configureStore({
  reducer: {
    cart: cartReducer,
    register: registerReducer,
    activate: activateReducer,
    login: LoginReducer,
    products: productsReducer,
    AddProduct: AddProductsReducer,
    SingleProduct: SingleProductSlice,
    userData: userSlice,
  },
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch

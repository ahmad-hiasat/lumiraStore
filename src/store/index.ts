import { configureStore } from "@reduxjs/toolkit"
import registerReducer from "../features/auth/RegisterSlice"
import activateReducer from "../features/auth/ActivateSlice"
import LoginReducer from "../features/auth/LoginSlice"
import productsReducer from "../features/Products/ProductsSlice";
import AddProductsReducer from "../features/Products/addProductsSlice";
import SingleProductSlice from "../features/SingleProduct/singleProductSlice";
import userSlice from "../features/userData/userDataSlice";
import forgetReducer from "../features/auth/forgetPasswordSlice";
import cartReducer from "../features/cart/cartSlice";
import DeleteProductReducer from "../features/Products/DeleteSlice";
import searchReducer from "../features/search/searchSlice";

export const Store = configureStore({
  reducer: {
    cart: cartReducer,
    register: registerReducer,
    activate: activateReducer,
    login: LoginReducer,
    products: productsReducer,
    AddProduct: AddProductsReducer,
    DeleteProduct: DeleteProductReducer,
    SingleProduct: SingleProductSlice,
    userData: userSlice,
    forget: forgetReducer,
    search: searchReducer,
  },
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch

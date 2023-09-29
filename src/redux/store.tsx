import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import bankSlice from "./reducers/bankSlice";
import accountSlice from "./reducers/accountSlice";
import confirmSlice from "./reducers/confirmSlice";
import invoiceSlice from "./reducers/invoiceSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    bank: bankSlice,
    account: accountSlice,
    confirm: confirmSlice,
    invoice: invoiceSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

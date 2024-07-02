// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import {
  walletsListReducer,
  disconnectWallet,
  connectWallet,
} from "./slice/walletsListSlice";

// ** Reducers
export const store = configureStore({
  reducer: {
    walletsList: walletsListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
// ** Reducers

// 監測 API
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export { disconnectWallet, connectWallet };

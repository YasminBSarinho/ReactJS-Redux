import { configureStore } from "@reduxjs/toolkit";
import { chamadosApi } from "./api/chamadosApi";
import { comentariosApi } from "./api/comentariosApi";

import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [chamadosApi.reducerPath]: chamadosApi.reducer,
    [comentariosApi.reducerPath]: comentariosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      chamadosApi.middleware,
      comentariosApi.middleware
  ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
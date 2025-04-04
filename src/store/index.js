import { configureStore } from "@reduxjs/toolkit";

import themeReducer from '../features/theme/ThemeSlice'
import authReducer from "../features/user/UserSlice";
import { eventosApi } from "../services/eventosService";
import { authApi } from "../services/authService";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    [eventosApi.reducerPath]: eventosApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(eventosApi.middleware)
      .concat(authApi.middleware)
});

setupListeners(store.dispatch);

export default store;
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./Reducers/rootReducer"; // Ensure this imports your combined reducers

const persistConfig = {
  key: "root",
  storage,
  
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Ignore persist actions
        ignoredPaths: ["register"], // You can ignore the specific path if necessary
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };

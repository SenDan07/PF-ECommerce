import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducer.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "main-root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = createStore(
//   rootReducer,
//   composeWithDevTools(persistedReducer, applyMiddleware(thunk))
// );

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// export const store = createStore(persistedReducer, applyMiddleware(thunk));

const Persistor = persistStore(store);

export { Persistor };

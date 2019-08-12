import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import reducer from "./reducers/reducer";

const persistConfig = {
  key: "root",
  storage
};

const middlewareArray = [thunk, promise()];

if (process.env !== "production") {
  middlewareArray.push(logger);
}

const persistedReducer = persistReducer(persistConfig, reducer);

const middleware = applyMiddleware(...middlewareArray);

export const store = createStore(persistedReducer, middleware);
export const persistor = persistStore(store);

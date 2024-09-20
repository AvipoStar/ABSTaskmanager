import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./slices/workerSlice";

export const store = configureStore({
  reducer: rootReducer,
});

// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import stepSlice from "./stepSlice";

const store = configureStore({
  reducer: {
    step: stepSlice, // Add the stepSlice reducer under the 'step' key
    // Add your other reducers here
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

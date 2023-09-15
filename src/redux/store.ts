// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";

// Import your reducers here
import yourReducer from "./yourReducer";

const store = configureStore({
  reducer: {
    // Add your reducers here
    yourReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

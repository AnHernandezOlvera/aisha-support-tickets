import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "../features/reports/store/tickets/ticketsSlice";

/**
 * Root Redux store configuration.
 *
 * Combines all feature slices and provides the global application state.
 */


export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

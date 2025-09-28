import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ticketsMock } from "./ticketsData";

/**
 * Redux slice for managing support tickets.
 *
 * State shape:
 * - items: Array of Ticket objects
 *
 * Provides reducers to create and delete ticket.
 */


export interface Ticket {
  id: string;
  subject: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  date: string;
  status: "Open" | "In Progress" | "Closed";
}

interface TicketsState {
  items: Ticket[];
}


const initialState: TicketsState = {
  items: ticketsMock,
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    /** Add a new ticket to the state */
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.items.unshift(action.payload)
    },
    /** Remove a ticket from the state by ID */
    deleteTicket: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    
  },
});

export const { addTicket, deleteTicket } =
  ticketsSlice.actions;

export default ticketsSlice.reducer;

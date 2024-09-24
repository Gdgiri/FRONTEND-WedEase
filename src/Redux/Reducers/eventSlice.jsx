import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
  },
  reducers: {
    createEvent: (state, action) => {
      state.events.push(action.payload);
    },
  },
});

export const { createEvent } = eventSlice.actions;

export default eventSlice.reducer;

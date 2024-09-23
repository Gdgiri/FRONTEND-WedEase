import { createSlice } from "@reduxjs/toolkit"; // Use import instead of require

const profileSlice = createSlice({
  name: "profiles",
  initialState: {
    profiles: [],
  },
  reducers: {
    createProfile: (state, action) => {
      state.profiles.push(action.payload); // Adds the profile to the profiles array
    },
  },
});

export const { createProfile } = profileSlice.actions;

export default profileSlice.reducer;

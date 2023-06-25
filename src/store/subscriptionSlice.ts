import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setSubscription: (_, action) => {
      return action.payload;
    }
  }
});

export const { setSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;

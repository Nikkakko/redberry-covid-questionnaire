import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

// Define a type for the slice state
interface QuestState {
  isStarted: boolean;
  isDisabled: boolean;
}

// Define the initial state using that type
const initialState: QuestState = {
  isStarted: false,
  isDisabled: true,
};

export const questSlice = createSlice({
  name: 'quest',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsStarted: (state, action: PayloadAction<boolean>) => {
      state.isStarted = action.payload;
    },

    setIsDisabled: (state, action: PayloadAction<boolean>) => {
      state.isDisabled = action.payload;
    },
  },
});

export const { setIsStarted, setIsDisabled } = questSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default questSlice.reducer;

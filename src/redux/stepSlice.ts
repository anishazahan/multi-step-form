// redux/stepSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StepState {
  activeStep: number;
}

const initialState: StepState = {
  activeStep: 1, // Set the initial active step to 1
};

const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
  },
});

export const { setActiveStep } = stepSlice.actions;

export default stepSlice.reducer;

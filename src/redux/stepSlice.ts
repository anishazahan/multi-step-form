// stepSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StepState {
  activeStep: number;
  step1Valid: boolean;
  step2Valid: boolean;
  step3Valid: boolean;
}

const initialState: StepState = {
  activeStep: 1,
  step1Valid: false,
  step2Valid: false,
  step3Valid: false,
};

const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
    setStepValid: (
      state,
      action: PayloadAction<{ step: number; valid: boolean }>
    ) => {
      const { step, valid } = action.payload;
      switch (step) {
        case 1:
          state.step1Valid = valid;
          break;
        case 2:
          state.step2Valid = valid;
          break;
        case 3:
          state.step3Valid = valid;
          break;
        default:
          break;
      }
    },
  },
});

export const { setActiveStep, setStepValid } = stepSlice.actions;

export default stepSlice.reducer;

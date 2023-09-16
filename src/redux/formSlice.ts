// formSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  isMailingListChecked: boolean;
  isTermsChecked: boolean;
}

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  confirmEmail: "",
  isMailingListChecked: false,
  isTermsChecked: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<Partial<FormState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateField } = formSlice.actions;
export default formSlice.reducer;

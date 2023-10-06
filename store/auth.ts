import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SpaceData } from "@heds-dev/hedsvote";
import { ModalSteps } from "@heds-dev/auth";

export interface AuthState {
    currentStep: ModalSteps;
    isModalOpen: boolean;
    user?: any
}

const initialState: AuthState = {
    currentStep: ModalSteps.NEW,
    isModalOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<ModalSteps>) {
      state.currentStep = action.payload;
    },
    setModalState(state, action: PayloadAction<boolean>) {
        state.isModalOpen = action.payload;
    },
    setUser(state, action: PayloadAction<any>) {
        state.user = action.payload;
    },
    reset: () => initialState
  },
});

export const { setModalState, setStep, setUser, reset } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  message: string | null;
  type: "success" | "error" | "info" | "warning";
  visible: boolean;
}

const initialState: AlertState = {
  message: null,
  type: "info",
  visible: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<{ message: string; type?: AlertState["type"] }>) => {
      state.message = action.payload.message;
      state.type = action.payload.type || "info";
      state.visible = true;
    },
    hideAlert: (state) => {
      state.visible = false;
      state.message = null;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;

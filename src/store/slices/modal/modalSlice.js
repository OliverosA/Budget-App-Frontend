import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setShow: (state) => {
      state.show = true;
    },
    setHide: (state) => {
      state.show = false;
    },
  },
});

export const { setShow, setHide } = modalSlice.actions;

export default modalSlice.reducer;

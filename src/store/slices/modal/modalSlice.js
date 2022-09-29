import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    changeShow: (state) => {
      state.show = !state.show;
    },
  },
});

export const { /*setShow, setHide*/ changeShow } = modalSlice.actions;

export default modalSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export interface Worker {
  id: number;
  login: string;
  password: string;
  fio: string;
  mail: string;
}

export const workerSlice = createSlice({
  name: "user",
  initialState: {} as Worker,
  reducers: {
    auth: (state, _action) => {
      state = _action.payload;
    },
  },
});

export const { auth } = workerSlice.actions;

export default workerSlice.reducer;

import { combineReducers, createSlice } from "@reduxjs/toolkit";

export interface Worker {
  id: number;
  login: string;
  password: string;
  fio: string;
  mail: string;
}

const initialState: Worker = {
  id: 0,
  login: "",
  password: "",
  fio: "",
  mail: "",
};

export const workerSlice = createSlice({
  name: "worker",
  initialState,
  reducers: {
    auth: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const rolesSlice = createSlice({
  name: "roles",
  initialState: {},
  reducers: {
    setRoles: (_state, action) => {
      return action.payload;
    },
  },
});

export const directionsSlice = createSlice({
  name: "directions",
  initialState: {},
  reducers: {
    setDirections: (_state, action) => {
      return action.payload;
    },
  },
});

export const { auth } = workerSlice.actions;
export const { setRoles } = rolesSlice.actions;
export const { setDirections } = directionsSlice.actions;

export const workerReducer = workerSlice.reducer;
export const rolesReducer = rolesSlice.reducer;
export const directionsReducer = directionsSlice.reducer;

export const rootReducer = combineReducers({
  roles: rolesReducer,
  worker: workerReducer,
  directions: directionsReducer,
});

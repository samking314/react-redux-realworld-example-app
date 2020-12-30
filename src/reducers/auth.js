import { LOGIN, REGISTER } from './../constants/actionTypes.js';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inProgress: false,
  errors: null,
};

const logincase = (state, action) => {
  state.inProgress = false;
  state.errors = action.error ? action.payload.errors : null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: logincase,
    register: logincase,
    asyncstart: (state, action) => {
      if (action.subtype === LOGIN || action.subtype === REGISTER) {
        state.inProgress = true;
      }
    },
    updatefieldauth: (state, action) => {
      state[action.key] = action.value;
    },
    unload: (state, action) => {}
  }
})

export const {
  login,
  register,
  asyncstart,
  updatefieldauth,
  unload
} = authSlice.actions;

export default authSlice.reducer;



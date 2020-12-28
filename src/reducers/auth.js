import { LOGIN, REGISTER } from './../constants/actionTypes.js';
import * as actions from './../actions';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  inProgress: false,
  errors: null,
};

const logincase = (state, action) => {
  state.inProgress = false;
  state.errors = action.error ? action.payload.errors : null;
}

export default createReducer(initialState, builder => {
  builder
    .addCase(actions.login, logincase)
    .addCase(actions.register, logincase)
    .addCase(actions.asyncstart, (state, action) => {
      if (action.subtype === LOGIN || action.subtype === REGISTER) {
        state.inProgress = true;
      }
    })
    .addCase(actions.updatefieldauth, (state, action) => {
      state[action.key] = action.value;
    })
    .addDefaultCase((state, action) => {}) //handles LOGIN_PAGE_UNLOADED and REGISTER_PAGE_UNLOADED
})

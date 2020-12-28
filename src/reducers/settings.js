import * as actions from './../actions';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  inProgress: null,
  errors: null,
};

export default createReducer(initialState, builder => {
  builder
    .addCase(actions.settingssaved, (state, action) => {
      state.inProgress = false;
      state.errors = action.error ? action.payload.errors : null;
    })
    .addCase(actions.asyncstart, (state, action) => {
      state.inProgress = true;
    })
    .addDefaultCase((state, action) => {}) //handles SETTINGS_PAGE_UNLOADED
});

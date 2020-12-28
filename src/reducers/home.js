import * as actions from './../actions';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  tags: [],
};

export default createReducer(initialState, builder => {
  builder
    .addCase(actions.homepageloaded, (state, action) => {
      state.tags = action.payload[0].tags;
    })
    .addDefaultCase((state, action) => {}) //handles HOME_PAGE_UNLOADED
})

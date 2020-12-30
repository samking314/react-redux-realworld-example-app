import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tags: [],
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    homepageloaded: (state, action) => {
      state.tags = action.payload[0].tags;
    },
    unload: (state, action) => {}
  }
})

export const { homepageloaded, unload } = homeSlice.actions;

export default homeSlice.reducer;



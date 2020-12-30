import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inProgress: null,
  errors: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    settingssaved: (state, action) => {
      state.inProgress = false;
      state.errors = action.error ? action.payload.errors : null;
    },
    asyncstart: (state, action) => {
      state.inProgress = true;
    },
    unload: (state, action) => {}
  }
})

export const { settingssaved, asyncstart, unload } = settingsSlice.actions;

export default settingsSlice.reducer;

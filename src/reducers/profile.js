import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  bio: null,
  image: null,
  following: null,
};

const updatestate = (profile, state) => {
  state.username = profile.username;
  state.bio = profile.bio;
  state.image = profile.image;
  state.following = profile.following;
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profilepageloaded: (state, action) => updatestate(action.payload[0].profile, state),
    followuser: (state, action) => updatestate(action.payload.profile, state),
    unfollowuser: (state, action) => updatestate(action.payload.profile, state),
    unload: (state, action) => {}
  }
})

export const { profilepageloaded, followuser, unfollowuser, unload } = profileSlice.actions;

export default profileSlice.reducer;


import * as actions from './../actions';
import { createReducer } from '@reduxjs/toolkit';

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

export default createReducer(initialState, builder => {
  builder
    .addCase(actions.profilepageloaded, (state, action) => updatestate(action.payload[0].profile, state))
    .addCase(actions.followuser, (state, action) => updatestate(action.payload.profile, state))
    .addCase(actions.unfollowuser, (state, action) => updatestate(action.payload.profile, state))
    .addDefaultCase((state, action) => {}) //handles PROFILE_PAGE_UNLOADED
})

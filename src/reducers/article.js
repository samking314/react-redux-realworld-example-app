import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  article: null,
  commentErrors: null,
  comments: [],
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    articlepageloaded: (state, action) => {
      state.article = action.payload[0].article;
      state.comments = action.payload[1].comments;
    },
    addcomment: (state, action) => {
      state.commentErrors = action.error ? action.payload.errors : null;
      state.comments = action.error ?
        null :
        (state.comments || []).concat([action.payload.comment]);
    },
    deletecomment: (state, action) => {
      const commentId = action.commentId;
      state.comments = state.comments.filter(comment => comment.id !== commentId);
    },
    unload: (state, action) => {}
  }
})

export const {
  articlepageloaded,
  addcomment,
  deletecomment,
  unload
} = articleSlice.actions;

export default articleSlice.reducer;

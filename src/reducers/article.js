import * as actions from './../actions';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  article: null,
  commentErrors: null,
  comments: [],
};

export default createReducer(initialState, builder => {
  builder
    .addCase(actions.articlepageloaded, (state, action) => {
      state.article = action.payload[0].article;
      state.comments = action.payload[1].comments;
    })
    .addCase(actions.addcomment, (state, action) => {
      state.commentErrors = action.error ? action.payload.errors : null;
      state.comments = action.error ?
        null :
        (state.comments || []).concat([action.payload.comment]);
    })
    .addCase(actions.deletecomment, (state, action) => {
      const commentId = action.commentId;
      state.comments = state.comments.filter(comment => comment.id !== commentId);
    })
    .addDefaultCase((state, action) => state) //handles ARTICLE_PAGE_UNLOADED
})

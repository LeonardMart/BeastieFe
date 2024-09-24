// reducer.ts
import {Reducer} from 'redux'; // Corrected import
import {SAVE_USER_BOOKMARK_INFO} from './bookmarkTypes';
import {BookmarkInfo} from '../../types';

interface BookmarkState {
  bookmarkInfo: BookmarkInfo[] | null;
}

const initialState: BookmarkState = {
    bookmarkInfo: [],
};

const userBookmarkReducer: Reducer<BookmarkState, any> = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER_BOOKMARK_INFO:
      return {
        ...state,
        bookmarkInfo: action.payload,
      };
    default:
      return state;
  }
};

export default userBookmarkReducer;

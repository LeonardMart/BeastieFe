// actions.ts
import {SAVE_USER_BOOKMARK_INFO} from './bookmarkTypes';
import {BookmarkInfo} from '../../types';

export const saveUserBookmarkInfo = (ownerBookmarkInfo: BookmarkInfo[]) => ({
  type: SAVE_USER_BOOKMARK_INFO,
  payload: ownerBookmarkInfo,
});
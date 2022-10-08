import { configureStore } from "@reduxjs/toolkit";

import videoPlayListsReducer from "../features/videoPlayLists/videoPlayListsSlice";

export const store = configureStore({
  reducer: {
    videoPlayLists: videoPlayListsReducer
  }
});
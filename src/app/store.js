import { configureStore } from "@reduxjs/toolkit";

import videoReducer from "../features/videos/videosSlice";

export const store = configureStore({
  reducer: {
    videos: videoReducer
  }
});
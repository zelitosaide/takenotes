import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { API } from "../../api/client";

export const fetchVideoPlayLists = createAsyncThunk("videoPlayLists/fetchVideoPlayLists",
  async function () {
    const response = await API.get("/videoPlayLists");
    return response.data;
  }
);

const initialState = {
  videoPlayLists: [],
  status: "idle",
  error: null
}

const videoPlayListsSlice = createSlice({
  name: "videoPlayLists",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchVideoPlayLists.pending, function (state) {
        state.status = "pending";
      })
      .addCase(fetchVideoPlayLists.fulfilled, function (state, action) {
        state.videoPlayLists = state.videoPlayLists.concat(action.payload);
        state.status = "fulfilled";
      })
      .addCase(fetchVideoPlayLists.rejected, function (state, action) {
        state.status = "rejected";
        state.error = action.error.message;
      });
  }
});

export default videoPlayListsSlice.reducer;
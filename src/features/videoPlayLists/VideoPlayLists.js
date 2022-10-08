import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchVideoPlayLists } from "./videoPlayListsSlice";

// const BASE_URL = process.env.REACT_APP_YOUTUBE_BASE_URL;
// const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export function VideoPlayLists() {
  const videoPlayLists = useSelector(function (state) {
    return state.videoPlayLists.videoPlayLists;
  });

  const fetchVideoPlayListsStatus = useSelector(function (state) {
    return state.videoPlayLists.status;
  });

  const dispatch = useDispatch();

  useEffect(function () {
    if (fetchVideoPlayListsStatus === "idle") {
      dispatch(fetchVideoPlayLists());
    }
  }, [dispatch, fetchVideoPlayListsStatus]);

  useEffect(() => {
    // fetch(`${BASE_URL}?part=snippet&key=${API_KEY}&playlistId=${videoPlayLists[0].playlistId}`)
    //   .then(response => response.json())
    //   .then(data => console.log("data", data));

  }, [videoPlayLists]);

  const videoPlayListItems = videoPlayLists.map((videoPlayList, index) => (
    <li key={index}>
      {videoPlayList.title}
    </li>
  ));

  return (
    <div>
      <h1>Video Playlists</h1>
      <ul>{videoPlayListItems}</ul>
    </div>
  );
}
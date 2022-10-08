import { useSelector } from "react-redux";

import { VideoPlayListRow } from "./VideoPlayListRow";

export function VideoPlayListTableBody() {
  const videoPlayLists = useSelector(state => state.videoPlayLists.videoPlayLists);

  const videoPlayListRows = videoPlayLists.map((videoPlayList, index) => (
    <VideoPlayListRow
      videoPlayList={videoPlayList}
      key={index}
    />
  ));

  return (
    <tbody>
      {videoPlayListRows}
    </tbody>
  );
}
import { useSelector } from "react-redux";

import { VideoCategoryRow } from "./VideoCategoryRow";
import { VideoRow } from "./VideoRow";

export function VideoTableBody() {
  const videos = useSelector(state => state.videos);
  const rows = [];
  let lastCategory = null;

  videos.forEach(video => {
    if (video.category !== lastCategory) {
      rows.push(
        <VideoCategoryRow
          category={video.category}
          key={video.category}
        />
      );
    }
    rows.push(
      <VideoRow
        video={video}
        key={video.url}
      />
    );
    lastCategory = video.category;
  });

  return (
    <tbody>
      {rows}
    </tbody>
  );
}
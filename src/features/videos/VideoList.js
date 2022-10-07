import { useSelector } from "react-redux";

const BASE_URL = "https://www.youtube.com/";

export function VideoList() {
  const videos = useSelector(state => state.videos);

  const videoItems = videos.map(video => (
    <li key={video.url}>
      <a
        href={BASE_URL + video.url}
        target="_blank"
        rel="noreferrer"
      >
        {video.title}
      </a>
    </li>
  ));

  return (
    <div>
      <h1>Video List</h1>
      <ul>{videoItems}</ul>
    </div>
  );
}
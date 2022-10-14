import axios from "axios";
import { useLoaderData } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_YOUTUBE_BASE_URL;
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export async function loader({ params }) {
  const { playlistId } = params;
  const { data } = await axios.get(
    `${BASE_URL}?part=snippet&key=${API_KEY}&playlistId=${playlistId}&maxResults=50`
  );
  return data;
}

export function Index() {
  const { items } = useLoaderData();

  return (
    <div>
      <h1>Playlist</h1>
      {items.length ? (
        <ol>
          {items.map(function (playlistItem) {
            const { snippet } = playlistItem;
            return (
              <li key={playlistItem.id}>{snippet.title}</li>
            );
          })}
        </ol>
      ) : (
        <p>
          <i>No playlist items</i>
        </p>
      )}
    </div>
  );
}
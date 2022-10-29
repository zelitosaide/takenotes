import { useState } from "react";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_YOUTUBE_BASE_URL;
const CHANNEL_ID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID;
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export async function action({ request }) {
  const formData = await request.formData();
  const playlist = Object.fromEntries(formData);
  const response = await fetch("https://takenotes-api.herokuapp.com/playlists", {
    method: "POST",
    body: JSON.stringify(playlist),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
  const { playlistId } = await response.json();
  return redirect(`/${playlistId}`);
}

export async function loader() {
  const response = await fetch(
    `${BASE_URL}/playlists?part=snippet&channelId=${CHANNEL_ID}&maxResults=50&key=${API_KEY}`
  );
  return await response.json();
}

export function CreatePlaylist() {
  const navigate = useNavigate();
  const { items } = useLoaderData();
  const [playlist, setPlaylist] = useState({});
  const playlists = items.map(function ({ id, snippet: { title } }) {
    return { id, title };
  });

  return (
    <div style={{ padding: 10 }}>
      <h4 style={{ margin: 0 }}>Create Playlist</h4>
      <Form method="post" id="playlist-form">
        {playlists.length && (
          <p>
            <label
              htmlFor="select-playlist"
              style={{ display: "block" }}
            >
              Select Playlist
            </label>
            <select id="select-playlist">
              <option>Select PlayList</option>
              {playlists.map(function (playlist) {
                return (
                  <option
                    key={playlist.id}
                    onClick={function () {
                      setPlaylist(playlist)
                    }}
                  >
                    {playlist.title}
                  </option>
                );
              })}
            </select>
          </p>
        )}
        <p>
          <label
            htmlFor="playlist-title"
            style={{ display: "block" }}
          >
            Playlist Title
          </label>
          <input
            id="playlist-title"
            placeholder="Playlist Title"
            aria-label="Playlist Title"
            type="text"
            name="title"
            defaultValue={playlist.title || ""}
          />
        </p>
        <p>
          <label
            htmlFor="playlist-id"
            style={{ display: "block" }}
          >
            Playlist ID
          </label>
          <input
            id="playlist-id"
            placeholder="Playlist ID"
            aria-label="Playlist ID"
            type="text"
            name="playlistId"
            readOnly
            defaultValue={playlist.id}
          />
        </p>
        <p>
          <button
            type="submit"
            style={{ marginRight: 10 }}
          >
            Save
          </button>
          <button
            type="button"
            onClick={function () {
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </p>
      </Form>
    </div>
  );
}
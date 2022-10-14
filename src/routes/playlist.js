import { useEffect, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";

import { API } from "../api/client";

const BASE_URL = process.env.REACT_APP_YOUTUBE_BASE_URL;
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export async function loader({ params }) {
  const { playlistId } = params;
  const response = await API.get(`/videoPlayLists/${playlistId}`);
  return { data: response.data };
}

export function PlayList() {
  const { data: playlist } = useLoaderData();
  const [playlistItems, setPlaylistItems] = useState([]);

  useEffect(function () {
    fetch(`${BASE_URL}?part=snippet&key=${API_KEY}&playlistId=${playlist.playlistId}&maxResults=50`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        setPlaylistItems(data.items);
      });
  }, [playlist.playlistId]);

  return (
    <div id="contact"> {/* id="playlist" */}
      <div>
        <h1>
          <i>{playlist.title}</i>
          <Favorite playlist={playlist} />
        </h1>
        {playlistItems.length ? (
          <ul>
            {playlistItems.map(function (playlistItem) {
              const { snippet } = playlistItem;
              return (
                <li key={playlistItem.id}>{snippet.title}</li>
              );
            })}
          </ul>
        ) : (
          <p>
            <i>No playlist items</i>
          </p>
        )}
        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="delete"
            onSubmit={function (event) {
              if (!window.confirm(
                "Please confirm you want to delete this record."
              )) {
                event.preventDefault();
              }
            }}
          >
            <button>Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ playlist }) {
  let favorite = playlist?.favorite;

  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? (
          "Remove from favorites"
        ) : (
          "Add to favorites"
        )}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
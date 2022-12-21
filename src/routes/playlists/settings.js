import { Form, useLoaderData, useNavigate, useFetcher } from "react-router-dom";

import { baseUrl } from "../../api/client";

export async function loader({ params }) {
  const playlistId = params.playlistId;
  const response = await fetch(`${baseUrl}/playlists/${playlistId}`);
  return await response.json();
}

export async function action({ request, params }) {
  const playlistId = params.playlistId;
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  return await fetch(`${baseUrl}/playlists/${playlistId}`, {
    method: "PATCH",
    body: JSON.stringify({
      ...updates,
      favorite: updates["favorite"] === "true",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

export function PlaylistSettings() {
  const playlist = useLoaderData();
  const navigate = useNavigate();
  const fetcher = useFetcher();

  let favorite = playlist.favorite;

  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <div style={{ padding: 10 }}>
      <h4 style={{ margin: 0 }}>
        Playlist settings{" "}
        <Form
          method="post"
          action="delete"
          style={{ display: "inline-block" }}
          onSubmit={function (event) {
            if (
              !window.confirm("Please confirm you want to delete this record.")
            ) {
              event.preventDefault();
            }
          }}
        >
          <button
            disabled
            type="submit"
          >
            Delete
          </button>
        </Form>{" "}
        <fetcher.Form
          method="post"
          style={{ display: "inline-block" }}
        >
          <button
            name="favorite"
            value={favorite ? "false" : "true"}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            {favorite ? "★" : "☆"}
          </button>
        </fetcher.Form>
      </h4>
      <fetcher.Form
        method="post"
        id="playlist-settings-form"
      >
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
            defaultValue={playlist.title}
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
            disabled
            defaultValue={playlist.playlistId}
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
      </fetcher.Form>
    </div>
  );
}

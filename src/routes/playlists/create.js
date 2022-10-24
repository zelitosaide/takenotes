import { Form, redirect, useNavigate } from "react-router-dom";

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

export function CreatePlaylist() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 10 }}>
      <h4 style={{ margin: 0 }}>Create Playlist</h4>
      <Form method="post" id="playlist-form">
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
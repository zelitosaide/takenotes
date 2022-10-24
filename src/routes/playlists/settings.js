import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";

export async function loader({ params }) {
  const playlistId = params.playlistId;
  const response = await fetch(`https://takenotes-api.herokuapp.com/playlists/${playlistId}`);
  return await response.json();
}

export async function action({ request, params }) {
  const playlistId = params.playlistId;
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  await fetch(`https://takenotes-api.herokuapp.com/playlists/${playlistId}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    }
  });

  return redirect(`/${playlistId}`);
}

export function PlaylistSettings() {
  const playlist = useLoaderData();
  const navigate = useNavigate();

  return (
    <div style={{ padding: 10 }}>
      <h4 style={{ margin: 0 }}>Playlist settings</h4>
      <Form method="post" id="playlist-settings-form">
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
      </Form>
    </div>
  );
}
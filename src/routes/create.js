import { Form, redirect } from "react-router-dom";

import { API } from "../api/client";

export async function action({ request }) {
  const formData = await request.formData();
  const playlist = Object.fromEntries(formData);
  const { data } = await API.post("/videoPlayLists", playlist);
  return redirect(`/playlists/${data._id}`);
}

export function CreatePlaylist() {
  return (
    <Form method="post" id="contact-form"> {/* id="playlist-form" */}
      <p>
        <span>Playlist Title</span>
        <input
          placeholder="Playlist Title"
          aria-label="Playlist Title"
          type="text"
          name="title"
        />
      </p>
      <p>
        <span>Playlist ID</span>
        <input
          placeholder="Playlist ID"
          aria-label="Playlist ID"
          type="text"
          name="playlistId"
        />
      </p>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}
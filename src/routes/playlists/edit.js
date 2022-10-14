import {
  Form,
  redirect,
  useLoaderData,
  useNavigate
} from "react-router-dom";

import { API } from "../../api/client";

export async function loader({ params }) {
  const { playlistId } = params;
  const response = await API.get(`/videoPlayLists/${playlistId}`);
  return { data: response.data };
}

export async function action({ request, params }) {
  const { playlistId } = params;
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await API.patch(`/videoPlayLists/${playlistId}`, updates);
  return redirect(`/playlists/${playlistId}`);
}

export function EditPlaylist() {
  const { data: playlist } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Playlist Title</span>
        <input
          placeholder="Playlist Title"
          aria-label="Playlist Title"
          type="text"
          name="title"
          defaultValue={playlist.title}
        />
      </p>
      <p>
        <span>Playlist ID</span>
        <input
          placeholder="Playlist ID"
          aria-label="Playlist ID"
          type="text"
          name="playlistId"
          defaultValue={playlist.playlistId}
        />
      </p>
      <p>
        <button type="submit">Save</button>
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
  );
}
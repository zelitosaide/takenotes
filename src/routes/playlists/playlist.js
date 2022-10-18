import { Form, Outlet, useLoaderData } from "react-router-dom";

import { API } from "../../api/client";

export async function loader({ params }) {
  const { playlistId } = params;
  const response = await API.get(`/videoPlayLists/${playlistId}`);
  return { data: response.data };
}

export function PlayList() {
  const { data: playlist } = useLoaderData();

  return (
    <div id="contact">
      <div>
        <h1>
          <i>{playlist.title}</i>
          <Favorite playlist={playlist} />
        </h1>

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

        <Outlet />
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
import { useEffect } from "react";
import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";

import { baseUrl } from "../../api/client";

export async function loader({ request }) {
  const url = new URL(request.url);
  const playlist = url.searchParams.get("playlist");

  let response;

  if (playlist) {
    response = await fetch(`${baseUrl}/playlists?playlist=${playlist}`);
  } else {
    response = await fetch(baseUrl + "/playlists");
  }

  const playlists = await response.json();
  return { playlists, playlist };
}

export function Root() {
  const { playlists, playlist } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("playlist");

  useEffect(
    function () {
      document.getElementById("playlist").value = playlist;
    },
    [playlist]
  );

  return (
    <>
      <div
        id="root"
        style={{
          float: "left",
          width: 250,
          padding: 10,
          borderRight: "1px solid #555",
        }}
      >
        <div>
          <Form action="create">
            <button
              type="submit"
              style={{ width: "100%", marginBottom: 10 }}
            >
              Create New Playlist
            </button>
          </Form>
          <Form action="import">
            <button
              type="submit"
              style={{ width: "100%", marginBottom: 10 }}
            >
              Import Playlist From YouTube
            </button>
          </Form>
          <Form
            id="search-playlist-form"
            role="search"
          >
            <input
              id="playlist"
              aria-label="Search Playlist"
              placeholder="Search Playlist"
              type="search"
              name="playlist"
              style={{ width: "100%" }}
              defaultValue={playlist}
              className={searching ? "loading" : ""}
              onChange={function (event) {
                const isFirstSearch = playlist == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            />
          </Form>
        </div>

        <nav
          id="sidebar"
          style={{ marginTop: 10 }}
        >
          {playlists.length ? (
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {playlists.map(function (playlist) {
                return (
                  <li
                    key={playlist.playlistId}
                    style={{ fontSize: 14 }}
                  >
                    <NavLink
                      to={`${playlist.playlistId}`}
                      className={function ({ isActive, isPending }) {
                        return isActive ? "active" : isPending ? "pending" : "";
                      }}
                    >
                      {playlist.title} {playlist.favorite && <span>★</span>}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>
              <i>No playlists</i>
            </p>
          )}
        </nav>
      </div>

      <div
        id="playlist-outlet"
        style={{
          float: "left",
          width: "calc(100% - 250px)",
        }}
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}

import { Form, NavLink, Outlet, useLoaderData } from "react-router-dom";

export async function loader() {
  const response = await fetch("https://takenotes-api.herokuapp.com/playlists");
  return await response.json();
}

export function Root() {
  const playlists = useLoaderData();

  return (
    <>
      <div
        id="root"
        style={{
          float: "left",
          width: 200,
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
              Create Playlist
            </button>
          </Form>
          <Form id="search-playlist-form" role="search">
            <input
              id="playlist"
              aria-label="Search Playlist"
              placeholder="Search Playlist"
              type="search"
              name="playlist"
              style={{ width: "100%" }}
            />
          </Form>
        </div>

        <nav style={{ marginTop: 10 }}>
          {playlists.length ? (
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {playlists.map(function (playlist) {
                return (
                  <li key={playlist.playlistId} style={{ fontSize: 14 }}>
                    <NavLink to={`${playlist.playlistId}`}>
                      {playlist.title}{" "}
                      {playlist.favorite && <span>★</span>}
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
          width: "calc(100% - 200px)",
        }}
      >
        <Outlet />
      </div>
    </>
  );
}
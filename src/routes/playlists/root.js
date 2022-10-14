import {
  NavLink,
  Outlet,
  useLoaderData,
  useNavigate,
  useNavigation
} from "react-router-dom";

import { API } from "../../api/client";

export async function loader() {
  const { data } = await API.get("/videoPlayLists");
  return { data };
}

export function Root() {
  const { data: playlists } = useLoaderData();

  const navigate = useNavigate();
  const navigation = useNavigation();

  return (
    <>
      <div id="sidebar">
        <h1>YouTube Video Playlists</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="search"
              aria-label="Search YouTube Video Playlists"
              placeholder="Search"
              type="search"
              name="search"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            />
          </form>
          <form>
            <button
              type="button"
              onClick={function () {
                navigate("playlists/create");
              }}
            >
              Add
            </button>
          </form>
        </div>
        <nav>
          {playlists.length ? (
            <ul>
              {playlists.map(function (playlist) {
                return (
                  <li key={playlist._id}>
                    <NavLink
                      to={`playlists/${playlist.playlistId}`}
                      className={function ({ isActive, isPending }) {
                        return isActive
                          ? "active"
                          : isPending
                            ? "pending"
                            : ""
                      }}
                    >
                      {playlist.title}
                      {playlist.favorite && <span>★</span>}
                    </NavLink>
                  </li>
                )
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
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
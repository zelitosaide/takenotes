import { NavLink, Outlet, useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  return params.playlistId;
}

export function PlayList() {
  const playlistId = useLoaderData();

  return (
    <>
      <nav style={{ padding: 10, borderBottom: "1px solid #555" }}>
        <ul className="navbar" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {["Overview", "Settings"].map(function (item) {
            const path = item === "Overview" ? `/${playlistId}` : `${item.toLowerCase()}`;
            return (
              <li key={item} style={{ float: "left", marginRight: 10 }}>
                <NavLink to={path}>
                  {item}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div>
        <Outlet />
      </div>
    </>
  );
}
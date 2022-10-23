import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation
} from "react-router-dom";

export async function loader() {
  const response = await fetch("http://localhost:5000/invoices?limit=60");
  return await response.json();
}

export function Root() {
  const { items } = useLoaderData();
  const navigation = useNavigation();

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          <Form action="users/create">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {items.length ? (
            <ul>
              {items.map(function (item) {
                return (
                  <li key={item.number}>
                    <NavLink
                      to={`users/${item._id}`}
                      className={function ({ isActive, isPending }) {
                        return isActive
                          ? "active"
                          : isPending
                            ? "pending"
                            : ""
                      }}
                    >
                      {item.name}{" "}
                      {item.favorite && <span>★</span>}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>
              <i>No users</i>
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
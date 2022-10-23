import { useEffect } from "react";
import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit
} from "react-router-dom";

export async function loader({ request }) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  let response;

  if (search) {
    response = await fetch(`http://localhost:5000/invoices?search=${search}`);
  } else {
    response = await fetch(`http://localhost:5000/invoices?limit=60`);
  }

  const data = await response.json();
  return { ...data, search };
}

export function Root() {
  const { items, search } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching = navigation.location &&
    new URLSearchParams(navigation.location.search).has("search");

  useEffect(function () {
    document.getElementById("search").value = search;
  }, [search]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="search"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="search"
              defaultValue={search}
              onChange={function (event) {
                // We only want to replace search results, 
                // not the page before we started searching
                const isFirstSearch = search == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch
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
            ></div>
          </Form>
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
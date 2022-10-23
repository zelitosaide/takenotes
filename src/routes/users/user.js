import { Form, useLoaderData, useFetcher } from "react-router-dom";

export async function action({ request, params }) {
  const { userId } = params;
  const formData = await request.formData();
  return await fetch(`http://localhost:5000/invoices/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({
      favorite: formData.get("favorite") === "true",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    }
  });
}

export async function loader({ params }) {
  const { userId } = params;
  const response = await fetch(`http://localhost:5000/invoices/${userId}`);
  const data = await response.json();
  if (!data) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return data;
}

export function User() {
  const data = useLoaderData();
  const user = {
    ...data,
    avatar: "https://placekitten.com/g/200/200",
    twitter: "@zelitoabdala",
  };

  return (
    <div id="contact">
      <div>
        <img
          key={user._id}
          src={user.avatar || null}
          alt={user.name}
        />
      </div>

      <div>
        <h1>
          {user.name}
          <Favorite user={user} />
        </h1>

        {user.twitter && (
          <p>
            <a
              rel="noreferrer"
              target="_blank"
              href={`https://twitter.com/${user.twitter}`}
            >
              {user.twitter}
            </a>
          </p>
        )}

        {user.amount && <p>{user.amount}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="delete"
            onSubmit={function (event) {
              if (!window.confirm(
                "Please corfirm you want to delete this record."
              )) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>

    </div>
  );
}

function Favorite({ user }) {
  const fetcher = useFetcher();

  let favorite = user.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
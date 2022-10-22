import { Form, useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const { userId } = params;
  const response = await fetch(`http://localhost:5000/invoices/${userId}`);
  return await response.json();
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
  let favorite = user.favorite;

  return (
    <Form method="post">
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
    </Form>
  );
}
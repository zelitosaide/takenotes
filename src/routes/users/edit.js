import { Form, redirect, useLoaderData } from "react-router-dom";

export async function action({ request, params }) {
  const { userId } = params;
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  await fetch(`http://localhost:5000/invoices/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({
      ...updates,
      number: Number(updates.number)
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    }
  });

  return redirect(`/users/${userId}`);
}

export async function loader({ params }) {
  const { userId } = params;
  const response = await fetch(`http://localhost:5000/invoices/${userId}`);
  return await response.json();
}

export function EditUser() {
  const user = useLoaderData();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name/Number</span>
        <input
          placeholder="Name"
          aria-label="Name"
          type="text"
          name="name"
          defaultValue={user.name}
        />
        <input
          placeholder="Number"
          aria-label="Number"
          type="text"
          name="number"
          defaultValue={user.number}
        />
      </p>
      <label>
        <span>Amount</span>
        <input
          type="text"
          name="amount"
          placeholder="Amount"
          aria-label="Amount"
          defaultValue={user.amount}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}
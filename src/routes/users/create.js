import { Form, redirect } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  const response = await fetch("http://localhost:5000/invoices", {
    method: "POST",
    body: JSON.stringify({
      ...user,
      number: Number(user.number)
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
  const { _id } = await response.json();
  return redirect(`/users/${_id}`);
}

export function CreateUser() {
  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name/Number</span>
        <input
          placeholder="Name"
          aria-label="Name"
          type="text"
          name="name"
        />
        <input
          placeholder="Number"
          aria-label="Number"
          type="text"
          name="number"
        />
      </p>
      <label>
        <span>Amount</span>
        <input
          type="text"
          name="amount"
          placeholder="Amount"
          aria-label="Amount"
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}
import { redirect } from "react-router-dom";

export async function action({ params }) {
  // throw new Error("oh dang!");
  const { userId } = params;
  await fetch(`http://localhost:5000/invoices/${userId}`, {
    method: "DELETE"
  });
  return redirect("/");
}
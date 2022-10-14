import { redirect } from "react-router-dom";

import { API } from "../../api/client";

export async function action({ params }) {
  const { playlistId } = params;
  await API.delete(`/videoPlayLists/${playlistId}`);
  return redirect("/");
}
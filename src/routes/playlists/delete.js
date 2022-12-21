import { redirect } from "react-router-dom";

import { baseUrl } from "../../api/client";

export async function action({ params }) {
  const playlistId = params.playlistId;
  await fetch(`${baseUrl}/playlists/${playlistId}`, {
    method: "DELETE",
  });
  return redirect("/");
}

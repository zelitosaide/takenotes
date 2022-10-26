import { redirect } from "react-router-dom";

export async function action({ params }) {
  const playlistId = params.playlistId;
  await fetch(`https://takenotes-api.herokuapp.com/playlists/${playlistId}`, {
    method: "DELETE"
  });
  return redirect("/");
}
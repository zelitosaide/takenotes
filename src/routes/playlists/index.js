import axios from "axios";
import { useState } from "react";
import { Form, useLoaderData } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_YOUTUBE_BASE_URL;
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export async function loader({ params, request }) {
  const { playlistId } = params;
  const url = new URL(request.url);
  const nextPageToken = url.searchParams.get("nextPageToken");
  const prevPageToken = url.searchParams.get("prevPageToken");

  let response;

  if (!nextPageToken && !prevPageToken) {
    response = await axios.get(
      `${BASE_URL}?part=snippet&key=${API_KEY}&playlistId=${playlistId}&maxResults=5`
    );
  }

  if (nextPageToken) {
    response = await axios.get(
      `${BASE_URL}?part=snippet&key=${API_KEY}&playlistId=${playlistId}&maxResults=5&pageToken=${nextPageToken}`
    );
  }

  if (prevPageToken) {
    response = await axios.get(
      `${BASE_URL}?part=snippet&key=${API_KEY}&playlistId=${playlistId}&maxResults=5&pageToken=${prevPageToken}`
    );
  }

  return response.data;
}

export function Index() {
  const { items, nextPageToken, prevPageToken, pageInfo: { totalResults, resultsPerPage } } = useLoaderData();
  const [page, setPage] = useState(1);

  return (
    <div>
      <h1>Playlist</h1>
      {items.length ? (
        <ol>
          {items.map(function (playlistItem) {
            const { snippet } = playlistItem;
            return (
              <li key={playlistItem.id}>{snippet.title}</li>
            );
          })}
        </ol>
      ) : (
        <p>
          <i>No playlist items</i>
        </p>
      )}
      <Form>
        <div style={{ padding: 5 }}>
          <button
            type="submit"
            style={{ marginRight: 5 }}
            name="prevPageToken"
            value={prevPageToken}
            disabled={!prevPageToken}
            onClick={function () {
              if (prevPageToken) {
                setPage(function (prev) {
                  return prev - 1;
                });
              }
            }}
          >
            Previous
          </button>
          <button
            type="submit"
            name="nextPageToken"
            value={nextPageToken}
            disabled={!nextPageToken}
            onClick={function () {
              if (nextPageToken) {
                setPage(function (prev) {
                  return prev + 1;
                });
              }
            }}
          >
            Next
          </button>
        </div>
      </Form>
      <div>page {page} of {Math.ceil(totalResults / resultsPerPage)}</div>
    </div>
  );
}
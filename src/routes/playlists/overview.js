import { useEffect, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_YOUTUBE_BASE_URL;
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export async function loader({ params, request }) {
  const playlistId = params.playlistId;
  const url = new URL(request.url);
  const next = url.searchParams.get("next");
  const prev = url.searchParams.get("prev");

  let response;

  if (!next && !prev) {
    response = await fetch(
      `${BASE_URL}?part=snippet&key=${API_KEY}&playlistId=${playlistId}&maxResults=20`
    );
  }

  if (next) {
    response = await fetch(
      `${BASE_URL}?part=snippet&key=${API_KEY}&playlistId=${playlistId}&maxResults=20&pageToken=${next}`
    );
  }

  if (prev) {
    response = await fetch(
      `${BASE_URL}?part=snippet&key=${API_KEY}&playlistId=${playlistId}&maxResults=20&pageToken=${prev}`
    );
  }

  const playlist = await response.json();

  if (playlist.error) {
    throw new Response("", {
      status: 404,
      statusText: playlist.error.message,
    });
  }
  return playlist;
}

export function Overview() {
  const {
    items: playlist,
    nextPageToken,
    prevPageToken,
    pageInfo: { totalResults, resultsPerPage }
  } = useLoaderData();
  const [page, setPage] = useState(1);
  const [videoId, setVideoId] = useState(
    playlist[0].snippet.resourceId.videoId
  );

  useEffect(function () {
    setVideoId(playlist[0].snippet.resourceId.videoId);
  }, [playlist]);

  return (
    <div>
      <div style={{ float: "left", width: "25%", borderRight: "1px solid #555", padding: 10 }}>
        <h4 style={{ margin: 0, }}>
          Playlist ( page {page} of {Math.ceil(totalResults / resultsPerPage)} )
        </h4>
        {playlist.length ? (
          <ol style={{ margin: 0, padding: 16 }}>
            {playlist.map(function (item) {
              const { snippet: { title, resourceId: { videoId } } } = item;
              return (
                <li
                  key={item.id}
                  style={{ fontSize: 14 }}
                  onClick={function () {
                    setVideoId(videoId);
                  }}
                >
                  {title.slice(0, 25)}...
                </li>
              );
            })}
          </ol>
        ) : (
          <p>
            <i>No playlist items</i>
          </p>
        )}
        <Form id="pagination-form">
          <button
            type="submit"
            style={{ marginRight: 10 }}
            name="prev"
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
            name="next"
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
        </Form>
      </div>

      <div style={{ float: "left", width: "50%", borderRight: "1px solid #555", padding: 10 }}>
        <h4 style={{ margin: 0 }}>Video</h4>
        {videoId}
      </div>

      <div style={{ float: "left", width: "25%", padding: 10 }}>
        <h4 style={{ margin: 0, }}>
          Notes
        </h4>
      </div>
    </div>
  );
}
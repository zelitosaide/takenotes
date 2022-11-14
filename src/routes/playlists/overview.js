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
      `${BASE_URL}/playlistItems?part=snippet&key=${API_KEY}&playlistId=${playlistId}&maxResults=20`
    );
  }

  if (next) {
    response = await fetch(
      `${BASE_URL}/playlistItems?part=snippet&key=${API_KEY}&playlistId=${playlistId}&maxResults=20&pageToken=${next}`
    );
  }

  if (prev) {
    response = await fetch(
      `${BASE_URL}/playlistItems?part=snippet&key=${API_KEY}&playlistId=${playlistId}&maxResults=20&pageToken=${prev}`
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
    pageInfo: { totalResults, resultsPerPage },
  } = useLoaderData();
  const [page, setPage] = useState(1);
  const [videoId, setVideoId] = useState(
    playlist[0].snippet.resourceId.videoId
  );
  const [videoTitle, setVideoTitle] = useState(playlist[0].snippet.title);
  const [videoIndex, setVideoIndex] = useState(0);

  useEffect(
    function () {
      setVideoId(playlist[0].snippet.resourceId.videoId);
      setVideoTitle(playlist[0].snippet.title);
      setVideoIndex(0);
    },
    [playlist]
  );

  return (
    <div>
      <div
        style={{
          float: "left",
          width: "25%",
          borderRight: "1px solid #555",
          padding: 10,
        }}
      >
        <h4 style={{ margin: 0 }}>
          Playlist ( page {page} of {Math.ceil(totalResults / resultsPerPage)} )
        </h4>
        {playlist.length ? (
          <ol style={{ margin: 0, padding: 16 }}>
            {playlist.map(function (item, index) {
              const {
                snippet: {
                  title,
                  resourceId: { videoId },
                },
              } = item;
              return (
                <li
                  key={item.id}
                  style={{
                    fontSize: 14,
                    color: title === videoTitle ? "red" : null,
                    cursor: "pointer",
                  }}
                  onClick={function () {
                    setVideoId(videoId);
                    setVideoTitle(title);
                    setVideoIndex(index);
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
      {playlist.length ? (
        <div
          style={{
            float: "left",
            width: "50%",
            borderRight: "1px solid #555",
            padding: 10,
          }}
        >
          <h4 style={{ margin: 0 }}>Video: {videoTitle}</h4>
          <iframe
            width="560"
            height="315"
            // src={`https://www.youtube.com/embed/${videoId}`}
            src={`https://www.youtube.com/embed/${
              playlist[videoIndex]
                ? playlist[videoIndex].snippet.resourceId.videoId
                : videoId
            }`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          >
            {/* {videoId} */}
            {/* {playlist[videoIndex].snippet.resourceId.videoId} */}
          </iframe>

          <div id="video-controls">
            <button
              style={{ marginRight: 10 }}
              onClick={function () {
                if (videoIndex > 0) {
                  setVideoTitle(playlist[videoIndex - 1].snippet.title);
                  setVideoIndex(videoIndex - 1);
                }
              }}
            >
              Previous Video
            </button>
            <button
              onClick={function () {
                if (videoIndex < playlist.length - 1) {
                  setVideoTitle(playlist[videoIndex + 1].snippet.title);
                  setVideoIndex(videoIndex + 1);
                }
              }}
            >
              Next Video
            </button>
          </div>
        </div>
      ) : null}
      <div style={{ float: "left", width: "25%", padding: 10 }}>
        <h4 style={{ margin: 0 }}>Notes</h4>
      </div>
    </div>
  );
}

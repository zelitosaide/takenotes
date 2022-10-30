import { Form, useNavigate } from "react-router-dom";

export function CreatePlaylist() {
  const navigate = useNavigate();

  return (
    <div>
      <h4
        style={{
          margin: 0,
          borderBottom: "1px solid #555",
          padding: 10
        }}
      >
        Create Playlist
      </h4>
      <Form style={{ padding: 10, paddingTop: 0 }} method="post">
        <p>
          <label
            htmlFor="playlist-title"
            style={{ display: "block" }}
          >
            Playlist Title
          </label>
          <input
            id="playlist-title"
            placeholder="Playlist Title"
            aria-label="Playlist Title"
            name="title"
            type="text"
          />
        </p>

        <p>
          <button
            type="submit"
            style={{ marginRight: 10 }}
            onClick={function (event) {
              event.preventDefault();
              alert("To be implemented soon!");
            }}
          >
            Save
          </button>
          <button
            type="button"
            onClick={function () {
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </p>
      </Form>
    </div>
  );
}
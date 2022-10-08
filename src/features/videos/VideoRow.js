export function VideoRow({ video }) {
  return (
    <tr>
      <td style={{ border: "1px solid black" }}>
        {video.title.slice(0, 20)}
      </td>
      <td style={{ border: "1px solid black" }}>
        {video.url.slice(0, 20)}
      </td>
    </tr>
  );
}
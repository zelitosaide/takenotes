export function VideoRow({ video }) {
  return (
    <tr>
      <td>{video.title.slice(0, 5)}</td>
      <td>{video.url.slice(0, 5)}</td>
    </tr>
  );
}
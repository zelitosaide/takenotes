export function VideoPlayListRow({ videoPlayList }) {
  return (
    <tr>
      <td style={{ border: "1px solid black" }}>
        {videoPlayList.title}
      </td>
      <td style={{ border: "1px solid black" }}>
        {videoPlayList.playlistId}
      </td>
    </tr>
  );
}
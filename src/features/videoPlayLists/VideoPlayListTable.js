import { VideoPlayListTableBody } from "./VideoPlayListTableBody";
import { VideoPlayListTableHead } from "./VideoPlayListTableHead";

export function VideoPlayListTable() {
  return (
    <div>
      <h1>Video PlayList Table</h1>
      <table style={{ border: "1px solid black" }}>
        <VideoPlayListTableHead />
        <VideoPlayListTableBody />
      </table>
    </div>
  );
}
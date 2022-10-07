import { VideoTableBody } from "./VideoTableBody";
import { VideoTableHead } from "./VideoTableHead";

export function VideoTable() {
  return (
    <div>
      <h1>Video Table</h1>
      <table>
        <VideoTableHead />
        <VideoTableBody />
      </table>
    </div>
  );
}
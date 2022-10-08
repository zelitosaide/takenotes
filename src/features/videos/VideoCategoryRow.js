export function VideoCategoryRow({ category }) {
  return (
    <tr>
      <th
        colSpan="2"
        style={{ border: "1px solid black" }}
      >
        {category}
      </th>
    </tr>
  );
}
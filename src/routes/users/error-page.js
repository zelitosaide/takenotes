import { useRouteError } from "react-router-dom";


export function ErrorPage() {
  const error = useRouteError();
  console.log(error.message);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured.</p>
      <p>
        <i>{error.statusText || error.status || error.message}</i>
      </p>
    </div>
  );
}
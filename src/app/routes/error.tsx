import { useRouteError } from "react-router";

// TODO: Generic Error Page
export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return <p>Error</p>;
};

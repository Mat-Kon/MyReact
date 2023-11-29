import { useRouteError } from 'react-router-dom';

type Error = {
  statusText: string;
  message: string;
}

export default function ErrorPage() {
  const error = useRouteError() as Error;
  console.error(error);

  return (
    <div className="error-content">
      <h1>WoW!</h1>
      <p>Sorry, I see error!</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
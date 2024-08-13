import { useNavigate } from "react-router-dom"; //useRouteError
import { BasicButton } from "../../UI/Buttons/CustomButton";

// type RouteError = {
//   status?: number;
//   statusText?: string;
//   message?: string;
//   internal: boolean;
//   data?: unknown;
//   error?: { message?: string };
// };

export default function PageNotFound() {
  // const error = useRouteError() as RouteError;
  const navigate = useNavigate();

  return (
    <div className="min-h-dynamic flex justify-center items-center flex-col">
      <h1 className="text-2xl mb-5">404 Page not found</h1>
      <BasicButton
        onClick={() => {
          navigate("/");
        }}
        variant="contained"
      >
        Go Home
      </BasicButton>
    </div>
  );

  // return (
  //   <div id="error-page">
  //     <h1>Oops!</h1>
  //     <p>Sorry, an unexpected error has occurred.</p>
  //     <p>
  //       <i>{error?.statusText || error?.error?.message}</i>
  //     </p>
  //   </div>
  // );
}

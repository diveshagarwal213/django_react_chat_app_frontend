// import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
//pages
import PageNotFound from "./pages/others/PageNotFound";
import Account from "./pages/Account/Account";
import Login from "./pages/Account/Login/Login";
import ErrorComponent from "./pages/others/ErrorComponent";
import LandingPage from "./pages/LandingPage/LandingPage";
import PagesMiddleware from "./Middleware/PageMiddlewares/PagesMiddleware";
import ListUserPage from "./pages/Users/ListUserPage";

//Lazy pages import example
// const LazyRestaurant = React.lazy(
//   () => import("./pages/Restaurant/Restaurant")
// );

//Lazy pages define example
// {
//   path: "restaurant",
//   element: (
//     <React.Suspense fallback="Loading...">
//       <LazyRestaurant />
//     </React.Suspense>
//   ),
// },

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorComponent />,
    //do not make child routes of '/'
    //use navigate to redirect to main page or use this as Landing page
  },
  {
    path: "account",
    element: <Account />,
    errorElement: <ErrorComponent />,
    children: [{ path: "login", element: <Login /> }],
  },
  //Sellers
  {
    path: "main",
    element: <PagesMiddleware />,
    errorElement: <ErrorComponent />,
    children: [
      {
        index: true,
        element: <Navigate to="/main/users" replace />,
      },
      {
        path: "users",
        element: <ListUserPage />,
      },
    ],
  },
  {
    path: "404",
    element: <PageNotFound />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

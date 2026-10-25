import { RouterProvider } from "react-router";
import * as Sentry from "@sentry/react";
import { router } from "./routes";

export default function App() {
  return <RouterProvider router={router} onError={function reportRouteError(error) {
    Sentry.captureException(error);
  }} />;
}

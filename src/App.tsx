import { createBrowserRouter, RouterProvider } from "react-router";
import { loaders } from "./lib/loaders";
import { Landing } from "./routes/Landing";
import { Directory } from "./routes/Directory";
import { Showcase } from "./routes/Showcase";
import { NotFound } from "./routes/NotFound";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/menu", element: <Directory /> },
  ...loaders.map((loader) => ({
    path: `/${loader.slug}`,
    element: <Showcase loader={loader} />,
  })),
  { path: "*", element: <NotFound /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

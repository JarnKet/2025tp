import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout.jsx";
import Home from "./routes/Home.jsx";
import Carparks from "./routes/Carparks.jsx";
import Events from "./routes/Events.jsx";
import Weather from "./routes/Weather.jsx";
import TravelPlanner from "./routes/TravelPlanner.jsx";
import Setting from "./routes/Setting.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "carparks",
          element: <Carparks />,
        },
        {
          path: "events",
          element: <Events />,
        },
        {
          path: "weather",
          element: <Weather />,
        },
        {
          path: "travel-planner",
          element: <TravelPlanner />,
        },
        {
          path: "setting",
          element: <Setting />,
        },
      ],
    },
  ],
  // { basename: "/01_module_d" }
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

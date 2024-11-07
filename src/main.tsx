import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { createRoutes } from "./routes/routeDefs";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider
      router={createBrowserRouter(createRoutesFromElements(createRoutes()))}
    />
  </StrictMode>,
);

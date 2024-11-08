import { GrazProvider } from "graz"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { saltplaer } from "./constant"
import { createRoutes } from "./routes/routeDefs"
import "./styles/index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GrazProvider
      grazOptions={{
        chains: [saltplaer],
      }}
    >
      <RouterProvider
        router={createBrowserRouter(createRoutesFromElements(createRoutes()))}
      />
      <ToastContainer />
    </GrazProvider>
  </StrictMode>,
)

import { Route } from "react-router"
import Detail from "../pages/Detail"
import { HomePage } from "../pages/Home"
import { CrateTokenPage } from "../pages/crateToken"

export const createRoutes = (): JSX.Element => {
  return (
    <Route>
      <Route path="/" element={<HomePage />} />
      <Route path="/detail/:address" element={<Detail />} />
      <Route path="/crate-token" element={<CrateTokenPage />} />
    </Route>
  )
}

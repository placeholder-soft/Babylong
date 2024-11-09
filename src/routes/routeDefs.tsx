import { Route } from "react-router"
import { CreateTokenPage } from "../pages/createToken"
import Detail from "../pages/Detail"
import { HomePage } from "../pages/Home"

export const createRoutes = (): JSX.Element => {
  return (
    <Route>
      <Route path="/" element={<HomePage />} />
      <Route path="/detail/:address" element={<Detail />} />
      <Route path="/create-token" element={<CreateTokenPage />} />
    </Route>
  )
}

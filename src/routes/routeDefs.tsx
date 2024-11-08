import { Route } from "react-router"
import Detail from "../pages/Detail"
import { HomePage } from "../pages/Home"
import { CreateTokenPage } from "../pages/createToken"
import { HomePageTest } from "../pages/Home/indexTest"

export const createRoutes = (): JSX.Element => {
  return (
    <Route>
      <Route path="/" element={<HomePage />} />
      <Route path="/test" element={<HomePageTest />} />
      <Route path="/detail/:address" element={<Detail />} />
      <Route path="/create-token" element={<CreateTokenPage />} />
    </Route>
  )
}

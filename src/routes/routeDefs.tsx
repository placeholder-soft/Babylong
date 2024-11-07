import {Outlet, Route} from "react-router";
import {HomePage} from "../pages/Home";

const RouteRootElement = () => {
  return <Outlet/>;
};

export const createRoutes = (): JSX.Element => {
  return (
      <Route element={<RouteRootElement/>}>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/detail" element={<div>detail</div>}/>
      </Route>
  );
};

import { Route } from "react-router";
import { HomePage } from "../pages/Home";

export const createRoutes = (): JSX.Element => {
  return (
    <Route>
      <Route path="/" element={<HomePage />} />
      <Route path="/detail" element={<div>detail</div>} />
    </Route>
  );
};

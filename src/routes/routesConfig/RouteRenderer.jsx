import { useRoutes } from "react-router";
import RoutesConfig from "./RoutesConfig";

const RouteRenderer = () => {
  const routes = useRoutes(RoutesConfig);
  return routes;
};

export default RouteRenderer;

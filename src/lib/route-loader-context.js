import { createContext, useContext } from "react";

export const RouteLoaderContext = createContext({
  empezarCarga: () => {},
  terminarCarga: () => {},
});

export function useRouteLoader() {
  return useContext(RouteLoaderContext);
}

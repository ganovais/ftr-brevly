import { BrowserRouter, Routes as RouteGroup, Route } from "react-router-dom";
import { HomePage } from "../pages/home";
import { RedirectPage } from "../pages/redirect";

export function Routes() {
  return (
    <BrowserRouter>
      <RouteGroup>
        <Route path="/" element={<HomePage />} />
        <Route path="/:shortCode" element={<RedirectPage />} />
      </RouteGroup>
    </BrowserRouter>
  );
}

import { AuthGuard } from "./guards/auth-guard";
import NotFound from "./pages/NotFound";
import Homepage from "./pages/index/Homepage";

export const routes = [
  {
    path: '/:id/:sheet',
    element: <Homepage />,
  },
    {
    path: '*',
    element: <NotFound />,
  },
]
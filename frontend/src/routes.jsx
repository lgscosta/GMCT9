import {
  BrowserRouter,
  useRoutes,
} from "react-router-dom";

// rotas da aplicacao
import Home from "./pages/home";
import Signin from "./pages/signin";
import Login from "./pages/login";
import Profile from "./pages/profile";
import PrivateRoute from "./components/privateRoute";
import Food from "./pages/food";
import Trend from "./pages/trend";
import Calendar from "./pages/calendar";
import Clock from "./pages/clock";

const RoutesPath = () => {
  let routes = useRoutes([
    { path: "/", element: <PrivateRoute><Home /></PrivateRoute> },
    { path: "login", element: <Login /> },
    { path: "profile", element: <PrivateRoute><Profile /></PrivateRoute> },
    { path: "food", element: <PrivateRoute><Food /></PrivateRoute> },
    { path: "trend", element: <PrivateRoute><Trend /></PrivateRoute> },
    { path: "calendar", element: <PrivateRoute><Calendar /></PrivateRoute> },
    { path: "clock", element: <PrivateRoute><Clock /></PrivateRoute> },
    { path: "signin", element: <Signin /> },
  ]);
  return routes;
};

const PageWrapper = () => {
  return (
    <BrowserRouter>
      <RoutesPath />
    </BrowserRouter>
  );
};

export default PageWrapper;
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import AddCategoryPage from "./pages/admin/addCategoryPage";

const routers = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<LandingPage />}></Route>,
    <Route path="/login" element={<Login />}></Route>,
    <Route path="/register" element={<Register />}></Route>,
    <Route path="/admin/add-category" element={<AddCategoryPage />}></Route>,
  ])
);

const App = () => {
  return <RouterProvider router={routers}></RouterProvider>;
};

export default App;

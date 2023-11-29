import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import ControlledFormPage from "./pages/controlled/ControlledFormPage";
import UncontrolledFormPage from "./pages/uncontrolled/UncontrolledFormPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path:'/controlled',
    element: <ControlledFormPage />,
  },
  {
    path:'/uncontrolled',
    element: <UncontrolledFormPage />,
  },
]);


const App = () => {

  return <RouterProvider router={router} />
}

export default App

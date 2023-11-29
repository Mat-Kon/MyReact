import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

const MainPage = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
};

export default MainPage;
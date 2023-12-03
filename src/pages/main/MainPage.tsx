import Header from "../../components/Header";
import React, { ReactNode } from "react";
import { useAppSelector } from "../../hooks/reduxHoks";
import ViewData from "../../components/ViewData";

interface IMainProps {
  children?: ReactNode;
}

const MainPage: React.FC<IMainProps> = ({ children }) => {
  const { form } = useAppSelector((store) => store.form);

  return (
    <>
      <Header />
      {children}
      <div className="data-container">
        {form.length ? <ViewData forms={form} /> : null}
      </div>
    </>
  )
};

export default MainPage;
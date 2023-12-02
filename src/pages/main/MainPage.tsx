import Header from "../../components/Header";
import React, { ReactNode, useEffect } from "react";
import { useAppSelector } from "../../hooks/reduxHoks";
import ViewData from "../../components/ViewData";
import { IFormData } from "../../types/types";

interface IMainProps {
  children?: ReactNode;
}

const MainPage: React.FC<IMainProps> = ({ children }) => {
  const { form } = useAppSelector((store) => store.form);
  const { img } = useAppSelector((store) => store.img);

  return (
    <>
      <Header />
      {children}
      <div className="data-container">
        {form ? <ViewData formData={form} /> : null}
        {img ? <img src={img} alt='image from redux' width={500} height={500}/> : null}
      </div>
    </>
  )
};

export default MainPage;
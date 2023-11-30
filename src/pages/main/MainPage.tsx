import Header from "../../components/Header";
import React, { ReactNode, useEffect } from "react";
import { useAppSelector } from "../../hooks/reduxHoks";
import ViewData from "../../components/ViewData";
import { IFormData } from "../../types/types";

interface IMainProps {
  children?: ReactNode;
}

const MainPage: React.FC<IMainProps> = ({ children }) => {
  const formData = useAppSelector((store) => store.form.form);

  return (
    <>
      <Header />
      {children}
      {/* {image && <img src={image} alt="Uploaded" />} */}
      {formData ? <ViewData formData={formData} /> : null}
    </>
  )
};

export default MainPage;
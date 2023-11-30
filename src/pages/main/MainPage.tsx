import Header from "../../components/Header";
import React, { ReactNode } from "react";

interface IMainProps {
  children?: ReactNode;
}

const MainPage: React.FC<IMainProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      {/* {image && <img src={image} alt="Uploaded" />} */}
    </>
  )
};

export default MainPage;
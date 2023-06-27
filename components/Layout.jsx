import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, userData }) => {
  return (
    <div>
      <Header userData={userData} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

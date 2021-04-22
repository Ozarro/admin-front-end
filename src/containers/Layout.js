import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "../assets/scss/style.scss";
import { Content, Footer, Header, Sidebar } from "./index";

const Layout = () => {
  return (
    <React.Fragment>
      <div className="c-app c-default-layout">
        <Sidebar />
        <div className="c-wrapper">
          <Header />
          <div className="c-body">
            <Content />
          </div>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;

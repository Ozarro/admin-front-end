import { CFooter } from "@coreui/react";
import React from "react";

const Footer = () => {
  return (
    <CFooter fixed={false}>
      <div>
       
        <span className="ml-1">&copy; 2020 creativeLabs.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          OZARRO
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(Footer);

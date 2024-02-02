import React from "react";
import { Footern } from "./footern";

interface Props {}

const Layout = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className="flex flex-col justify-between w-full h-screen ">
      <div className="container px-4 mx-auto mb-auto sm:px-8 lg:px-16 xl:px-20">
        {props.children}
      </div>
      <Footern />
    </div>
  );
};

export default Layout;

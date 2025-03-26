import React from "react";
import Navigation from "../Layout/Navigation/Navigation"
const Header = ({ headerAdminCss }) => {
  return (
    <div className={` w-full flex flex-none`}>
      <div className={` ${headerAdminCss ? 'hidden' : ''} flex justify-center items-center font-bold bg-primary text-white w-[256px] flex-none`}>
        Phòng Trọ 123.com
      </div>
      <div className={`flex-auto  w-full`}>
        <Navigation isAdmin={true} admin='admin' />
      </div>
    </div >
  )
};

export default Header;

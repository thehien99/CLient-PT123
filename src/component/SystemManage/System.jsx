import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import configRouter from "../../configRouter";
import Header from "./Header";
import SideBar from "./SideBar";
import icons from "../../utils/icons";
import memuSidebar from "../../utils/menuSideBar";
import { AiOutlineLogout } from "react-icons/ai";
import { logOut } from "../../redux/actions/authActions";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const System = () => {

  const isACtiveStyle = 'hover:bg-gray-200 flex rounded-md items-center gap-2 py-2 mt-2 font-bold bg-gray-200 no-underline text-black '
  const noActiveStyle = 'hover:bg-gray-200 flex rounded-md items-center gap-2 py-2 mt-2 cursor-pointer no-underline text-black'
  const [isShowMenu, setShowMenu] = useState(false)
  const dispatch = useDispatch()
  const { IoMdMenu } = icons
  const isLogin = useSelector(state => state.auth.isLogin)



  useEffect(() => {
    const handleClickCloseOutMenu = (e) => {
      const menu = document.getElementById('menuDropDown');
      if (menu && !menu.contains(e.target)) {
        setShowMenu(false)
      }
    };

    if (isShowMenu) {
      document.body.style.overflow = 'hidden' //off scroll y
      const overlay = document.createElement('div')
      overlay.id = 'menuOverlay';
      overlay.classList.add('fixed', 'top-0', 'right-0', 'w-full', 'h-full', 'bg-gray-800', 'opacity-50');
      document.body.appendChild(overlay)
      //lắng nghe sự kiện click ở ngoài
      document.addEventListener('click', handleClickCloseOutMenu)
    } else {
      document.body.style.overflow = 'auto'
      const overlay = document.getElementById('menuOverlay')
      if (overlay) {
        overlay.remove()
      }

      document.removeEventListener('click', handleClickCloseOutMenu)
    }

    return () => {
      document.removeEventListener('click', handleClickCloseOutMenu)
    }

  }, [isShowMenu])
  if (!isLogin) return <Navigate to={`/${configRouter.login}`} replace={true} />


  return (
    <div id="menuDropDown" className="w-full h-screen flex flex-col items-center">

      <Header headerAdminCss='header-admin' />

      <div className="flex w-full flex-auto">
        <div>
          <SideBar />
        </div>
        <div className="flex-auto w-full bg-white shadow-md h-full overflow-x-hidden">

          {/*------------ responsive mobile-------------*/}
          <div className=" hidden sm:block">
            <div className="mt-4 ms-2 flex items-center gap-2" onClick={(e) => setShowMenu(!isShowMenu)}>
              <IoMdMenu className="text-2xl" />
              <span className="text-xl text-center">Danh mục</span>
            </div>
            {isShowMenu &&
              <div className={`mt-4 absolute w-[90%] h-full bg-white p-3 z-10 shadow-xl top-[-23px] left-0 transition-transform duration-1000 ease-in-out ${isShowMenu ? 'translate-x-0' : 'translate-x-full'} `} >
                <div className="float-right mt-1 border-2 rounded-md hover:bg-black" onClick={() => setShowMenu(false)}><IoMdClose className="text-red-500" /></div>
                <div>
                  <NavLink to={'/'} className='no-underline text-lg flex justify-between items-center'>
                    <div className="flex items-center">
                      <span><FaArrowLeft /></span>
                      <span className="px-2 text-red-500">
                        Trang chủ
                      </span>
                    </div>
                  </NavLink>
                  {memuSidebar?.map((item) => {
                    return (
                      <NavLink onClick={() => setShowMenu(false)} className={({ isActive }) => isActive ? isACtiveStyle : noActiveStyle} key={item.id} to={item.path}>
                        {item.icon}
                        <span className="px-2 ">
                          {item.text}
                        </span>
                      </NavLink>
                    )
                  })}
                  <span className={noActiveStyle} onClick={() => dispatch(logOut)}>
                    <AiOutlineLogout />
                    <small className="px-2">Thoát</small>
                  </span>
                </div>
              </div>
            }
          </div>



          <div className="content_admin w-full py-3 sm:ps-2 sm:mt-3">
            <Outlet />
          </div>

        </div>
      </div>
    </div >
  )
};

export default System;

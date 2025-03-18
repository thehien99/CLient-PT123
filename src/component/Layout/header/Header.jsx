import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ButtonFrom from "../../InputForm/ButtonFrom";
import configRouter from "../../../configRouter";
import { logOut } from "../../../redux/actions/authActions";
import CurrentUser from "./CurrentUser";
import menuManage from "../../../utils/menuManage";
import icons from "../../../utils/icons";
import Navigation from "../Navigation/Navigation";
import { formatVietnameseToString } from "../../../utils/formatVietnameseToString";

const { AiOutlineLogout, BsChevronDown, AiOutlinePlusCircle, IoMdMenu, IoMdClose } = icons;

const Header = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.auth.isLogin);
  const cateData = useSelector((state) => state.category.categoryData.response)

  const goLogin = useCallback((flag) => {
    navigate(configRouter.login, { state: { flag } });
  }, []);

  const handleShowMenu = () => {
    setIsShowMenu(prev => !prev);
  };

  // Thêm event listener để đóng menu khi bấm ra ngoài
  useEffect(() => {
    const handleClickOutsideMenu = (e) => {
      const menu = document.getElementById('menuDropdown');
      if (menu && !menu.contains(e.target)) {
        setIsShowMenu(false);
      }
    };

    if (isShowMenu) {
      document.body.style.background = '#ccc'
      document.body.style.overflow = 'hidden'
      document.addEventListener('click', handleClickOutsideMenu);
    } else {
      document.body.style.background = '#fff'
      document.body.style.overflow = 'auto'
      document.removeEventListener('click', handleClickOutsideMenu);
    }

    return () => {
      document.removeEventListener('click', handleClickOutsideMenu);
    };
  }, [isShowMenu]);

  return (
    <div id="menuDropdown" className="container xs:w-full xs:shadow-2xl h-16 ">
      <div className="header">
        <div className="flex justify-around xs:justify-between items-center h-14">
          <NavLink to={'/'} className="md:text-[11px] xs:text-xl xs:text-red-400 no-underline">Phongtro123.com!</NavLink>

          <div className="xs:block hidden">
            <div className="flex gap-2" onClick={handleShowMenu}>
              <IoMdMenu className="text-2xl" />
              <small>Danh mục</small>
            </div>
          </div>

          {/*----- responsive menu mobile----- */}
          <div
            className={`w-[95%] h-screen z-10 absolute top-0 right-0 bg-slate-100 transform transition-all duration-75 ease-out ${isShowMenu ? 'translate-x-0' : 'translate-x-[100%]'}`}
          >
            <div className="flex justify-between items-center px-4 py-4 bg-white shadow-2xl">
              <div className="flex flex-col">
                <span>PhongTro123.com</span>
                <span>Kênh thông tin số 1 tại việt nam</span>
              </div>
              <div className="text-2xl" onClick={() => setIsShowMenu(!isShowMenu)}>
                <IoMdClose />
              </div>
            </div>

            <div className="p-4  h-full">
              <div className="flex flex-col gap-3" onClick={() => setIsShowMenu(false)}>
                <div className="flex gap-3">
                  <ButtonFrom
                    text={'Đăng nhập'}
                    textColor="text-white"
                    bgColor="bg-blue-700"
                    px='px-2'
                    onClick={() => goLogin(false)}
                  />
                  <ButtonFrom
                    text={'Đăng ký'}
                    bgColor="bg-red-600"
                    textColor="text-white"
                    px='px-2'
                    onClick={() => goLogin(true)}
                  />
                </div>
                <div>
                  <ButtonFrom
                    text={"Đăng tin mới"}
                    textColor="text-white"
                    bgColor="bg-red-600"
                    px='px-3'
                    IcAfter={AiOutlinePlusCircle}
                    onClick={() => navigate('/he-thong/tao-moi-bai-dang')}
                  />
                </div>
              </div>

              <div className="mt-3">
                <NavLink
                  onClick={() => setIsShowMenu(false)}
                  to={'/'} className={({ isActive }) => isActive ? 'flex flex-col p-3 no-underline border-2 mt-2 bg-yellow-500 rounded-lg text-white' : 'flex flex-col p-3 no-underline border-2 mt-2 bg-blue-500 rounded-lg text-white'}>
                  Trang chủ
                </NavLink>

                {cateData?.map((item) => {
                  return (
                    <NavLink
                      onClick={() => setIsShowMenu(false)}
                      className={({ isActive, isPending }) => isPending ? 'text-white' : isActive ? 'flex flex-col p-3 no-underline border-2 mt-2 bg-yellow-500 rounded-lg text-white' : 'flex flex-col p-3 no-underline border-2 mt-2 bg-blue-500 rounded-lg text-white'}
                      key={item?.code} to={`${formatVietnameseToString(item.value)}`}
                    >
                      {item.value}
                    </NavLink>)
                })}
              </div>
            </div>

          </div>



          {/*----- desktop menu----- */}
          <div className={`xs:hidden flex items-center gap-2 xs:top-[35%] xs:flex-col xs:justify-center xs:items-center xs:bg-[#09ebf7] xs:w-full xs:h-full xs:rounded-md`}>
            {!isLogin && (
              <div className="flex items-centers gap-2 xs:w-full xs:px-3">
                <ButtonFrom
                  text={'Đăng nhập'}
                  textColor="text-white"
                  bgColor="bg-blue-700"
                  px='px-2'
                  onClick={() => goLogin(false)}
                />
                <ButtonFrom
                  text={'Đăng ký'}
                  bgColor="bg-red-600"
                  textColor="text-white"
                  px='px-2'
                  onClick={() => goLogin(true)}
                />

              </div>
            )}

            {isLogin && (
              <div className="flex items-center gap-3 relative">
                <CurrentUser />
                <ButtonFrom
                  text={"Quản lý tài khoản"}
                  textColor="text-white"
                  bgColor="bg-blue-700"
                  IcAfter={BsChevronDown}
                  px="px-2"
                  onClick={() => setIsShowMenu(prev => !prev)}
                />
                {isShowMenu && (
                  <div className="absolute top-full bg-slate-100 shadow-md rounded-md p-2 right-0 flex flex-col">
                    {menuManage?.map((item) => {
                      return (
                        <Link
                          className="no-underline hover:text-orange-500 flex items-center gap-2 text-blue-400 border-b border-gray-200 py-2"
                          key={item.id}
                          to={item.path}
                        >
                          {item.icon}
                          {item.text}
                        </Link>
                      );
                    })}
                    <span
                      className="cursor-pointer hover:text-orange-500 text-blue-400 py-2 flex items-center gap-2"
                      onClick={() => {
                        setIsShowMenu(false);
                        dispatch(logOut);
                      }}
                    >
                      <AiOutlineLogout />
                      Đăng Xuất
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="xs:w-full xs:px-3">
              <ButtonFrom
                text={"Đăng tin mới"}
                textColor="text-white"
                bgColor="bg-red-600"
                px='px-3'
                IcAfter={AiOutlinePlusCircle}
                onClick={() => navigate('/he-thong/tao-moi-bai-dang')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

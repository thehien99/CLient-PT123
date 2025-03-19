import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ButtonFrom from "../../InputForm/ButtonFrom";
import configRouter from "../../../configRouter";
import { logOut } from "../../../redux/actions/authActions";
import CurrentUser from "./CurrentUser";
import menuManage from "../../../utils/menuManage";
import icons from "../../../utils/icons";
import { formatVietnameseToString } from "../../../utils/formatVietnameseToString";

const { AiOutlineLogout, BsChevronDown, AiOutlinePlusCircle, IoMdMenu, IoMdClose } = icons;

const Header = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowMenuMobile, setIsShowMenuMobile] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.auth.isLogin);
  const cateData = useSelector((state) => state.category.categoryData.response);

  const goLogin = useCallback((flag) => {
    navigate(configRouter.login, { state: { flag } });
  }, []);

  const handleShowMenuMobile = () => {
    setIsShowMenuMobile(!isShowMenuMobile);
  };


  useEffect(() => {
    const handleBeforeUnload = () => {
      const overlay = document.getElementById('menuOverlay');
      if (overlay) {
        overlay.remove();
      }
    };

    // Loại bỏ lớp phủ khi route thay đổi
    navigate(() => {
      handleBeforeUnload();
    });

    return () => {
      handleBeforeUnload();
    };
  }, [navigate]);


  // Thêm event listener để đóng menu khi bấm ra ngoài
  useEffect(() => {
    const handleClickOutsideMenu = (e) => {
      const menu = document.getElementById('menuDropdown');
      if (menu && !menu.contains(e.target)) {
        setIsShowMenuMobile(false);
      }
    };

    if (isShowMenuMobile) {
      // Hiển thị lớp phủ mờ lên body
      document.body.style.overflow = 'hidden'; // Tắt cuộn trang
      const overlay = document.createElement('div');
      overlay.id = 'menuOverlay';
      overlay.classList.add('fixed', 'top-0', 'left-0', 'w-full', 'h-full', 'bg-gray-800', 'opacity-50', 'z-30');
      document.body.appendChild(overlay);

      // Lắng nghe sự kiện click bên ngoài để đóng menu
      document.addEventListener('click', handleClickOutsideMenu);
    } else {
      document.body.style.overflow = 'auto'; // Bật lại cuộn trang
      // Loại bỏ lớp phủ mờ khi menu đóng
      const overlay = document.getElementById('menuOverlay');
      if (overlay) {
        overlay.remove()
      }


      document.removeEventListener('click', handleClickOutsideMenu);
    }

    return () => {
      document.removeEventListener('click', handleClickOutsideMenu);
    };
  }, [isShowMenuMobile]);

  return (
    <div id="menuDropdown" className="container xs:w-full xs:shadow-2xl h-16 md:shadow-2xl">
      <div className="header">
        <div className="flex justify-around xs:justify-between md:justify-between items-center h-14">
          <NavLink to={'/'} className="md:text-[15px] xs:text-xl xs:text-red-400 no-underline">Phongtro123.com!</NavLink>

          <div className="xs:block md:block hidden">
            <div className="flex gap-2" onClick={handleShowMenuMobile}>
              <IoMdMenu className="text-2xl" />
              <small>Danh mục</small>
            </div>
          </div>

          {/*----- responsive menu mobile----- */}
          <div
            className={`menu-responsive  xs:w-[95%] h-screen z-40 absolute top-0 right-0 bg-white transform transition-all duration-75 ease-out ${isShowMenuMobile ? 'translate-x-0' : 'translate-x-[100%]'}`}
          >
            <div className="flex justify-between items-center px-4 py-4 bg-white shadow-2xl">
              <div className="flex flex-col text-xs">
                <span>PhongTro123.com</span>
                <span>Kênh thông tin số 1 tại việt nam</span>
              </div>
              <div className="text-2xl" onClick={() => setIsShowMenuMobile(!isShowMenuMobile)}>
                <IoMdClose />
              </div>
            </div>

            <div className="px-3">
              {!isLogin && (
                <div className="p-4 h-full md:w-full">
                  <div className="flex flex-col gap-3 md:w-full" onClick={() => setIsShowMenuMobile(false)}>
                    <div className="flex md:w-full gap-3">
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

                  </div>


                </div>
              )}

              {isLogin && (
                <div className="px-3">
                  <div className="flex flex-col gap-3 mt-3">
                    <NavLink to={`/${configRouter.system}/${configRouter.editAccount}`} className='no-underline'>
                      <CurrentUser />
                    </NavLink>
                    <div className="md:w-full">
                      <ButtonFrom
                        text={"Đăng tin mới"}
                        textColor="text-white"
                        bgColor="bg-red-600"
                        px='px-3'
                        IcAfter={AiOutlinePlusCircle}
                        onClick={() => navigate('/he-thong/tao-moi-bai-dang')}
                      />
                    </div>
                    <span
                      className="p-3 rounded-md border-2 bg-red-500 text-black  cursor-pointer hover:text-orange-500 py-2 flex items-center gap-2"
                      onClick={() => {
                        setIsShowMenu(false);
                        dispatch(logOut);
                      }}
                    >
                      <AiOutlineLogout />
                      Đăng Xuất
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-3 px-3 py-1 bg-[#fffff] rounded-md border-2 shadow-2xl">
                <NavLink
                  onClick={() => setIsShowMenuMobile(false)}
                  to={'/'} className={({ isActive }) => isActive ? 'flex flex-col p-3 no-underline border-2 mt-2 bg-yellow-500 rounded-lg text-white' : 'flex flex-col p-3 no-underline border-2 mt-2 bg-blue-500 rounded-lg text-white'} >
                  Trang chủ
                </NavLink>

                {cateData?.map((item) => {
                  return (
                    <NavLink
                      onClick={() => setIsShowMenuMobile(false)}
                      className={({ isActive, isPending }) => isPending ? 'text-white' : isActive ? 'flex flex-col p-3 no-underline border-2 mt-2 bg-yellow-500 rounded-lg text-white' : 'flex flex-col p-3 no-underline border-2 mt-2 bg-blue-500 rounded-lg text-white'}
                      key={item?.code} to={`${formatVietnameseToString(item.value)}`}
                    >
                      {item.value}
                    </NavLink>
                  );
                })}
              </div>
            </div>


          </div>

          {/*----- desktop menu----- */}
          <div className={`xs:hidden md:hidden flex items-center gap-2 xs:top-[35%] xs:flex-col xs:justify-center xs:items-center xs:bg-[#09ebf7] xs:w-full xs:h-full xs:rounded-md`}>
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
              <div className="flex items-center gap-3 relative z-30">
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

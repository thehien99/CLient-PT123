import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import configRouter from "../../../configRouter";
import { formatVietnameseToString } from "../../../utils/formatVietnameseToString";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../../redux/actions/categoryAction";
const fixedNav = 'fixed top-0 left-0 right-0 text-center z-10 scrollY-smooth'

const Navigation = ({ isAdmin, admin }) => {

  const cateData = useSelector((state) => state.category.categoryData.response)
  const dispatch = useDispatch()
  const [fixed, setFixed] = useState(false)

  useEffect(() => {
    dispatch(getAllCategory)
  }, []);
  const navigationFixed = () => {
    if (window.scrollY >= 100) {
      setFixed(true)
    } else {
      setFixed(false)
    }
  }
  window.addEventListener("scroll", navigationFixed)

  return (
    <div className={`${fixed ? fixedNav : ""} navigation-wrapper xs:hidden md:hidden`} >
      <div className={` d-flex bg-primary ${isAdmin ? 'justify-start' : 'justify-center'}`}>
        <div className='p-3 '>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "text-white" : isActive ? "text-white bg-red-500 p-3 xs:p-0 xs:text-[10px]" : "xs:text-[13px]"
            }
            style={{ textDecoration: "none", color: "white" }}
            to={configRouter.home}
          >
            Trang Chủ
          </NavLink>
        </div>
        {cateData?.length > 0 &&
          cateData.map((item) => {
            return (
              <div
                className='p-3'
                key={item.code}
              >
                <NavLink
                  className={({ isActive, isPending }) => isPending ? "text-white xs:p-0 xs:text-[10px]" : isActive ? "text-white bg-red-500 p-3 xs:p-0 xs:text-[10px]" : "xs:text-[13px]"}
                  to={`${formatVietnameseToString(item.value)}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {item.value}
                </NavLink>
              </div>
            );
          })}
      </div>
    </div >
  );
};

export default Navigation;

import React, { useRef, useEffect } from "react"
import Header from "../../component/Layout/header/Header"
import Footer from "../../component/Layout/footer/Footer"
import Navigation from "./Navigation/Navigation"
import { Outlet, useLocation } from "react-router-dom"
import Search from "../page/Search/Search"
import { useSelector } from "react-redux"
const Layout = () => {
  const isLogin = useSelector(state => state.auth.isLogin)
  const listScrollRef = useRef()
  const location = useLocation()
  useEffect(() => {
    listScrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location])
  return (
    <div ref={listScrollRef}>
      <div className="home relative">
        <div className="relative">
          <Header />
          <Navigation />
          {isLogin && location.pathname !== '/lien-he' && !location.pathname?.includes("/chi-tiet") && <Search />}
        </div>
        <div className="content container">
          <Outlet />
        </div>
        <div className="footer bg-white">
          <Footer />
        </div>
      </div>
    </div>
  )
}
export default Layout
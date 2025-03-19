import React, { useRef, useEffect, useState } from "react"
import Header from "../../component/Layout/header/Header"
import Footer from "../../component/Layout/footer/Footer"
import Navigation from "./Navigation/Navigation"
import { Outlet, useLocation } from "react-router-dom"
import Search from "../page/Search/Search"
import { useSelector } from "react-redux"
const Layout = () => {
  const fixedHeader = 'fixed top-0 left-0 right-0 text-center z-10 scrollY-smooth bg-white'
  const isLogin = useSelector(state => state.auth.isLogin)
  const [fixed, setFixed] = useState(false)
  const listScrollRef = useRef()
  const location = useLocation()
  useEffect(() => {
    listScrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location])

  const headerFixed = () => {
    if (window.scrollY >= 100) {
      setFixed(true)
    } else {
      setFixed(false)
    }
  }

  window.addEventListener('scroll', headerFixed)

  return (
    <div ref={listScrollRef}>
      <div className="home relative">
        <div>
          <div className={`${fixed ? fixedHeader : ''}`}>
            <Header />
          </div>
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
    </div >
  )
}
export default Layout
import React, { useEffect, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import configRouter from "./configRouter";
import { useDispatch, useSelector } from "react-redux";
import { getAllPrice } from "./redux/actions/priceActions";
import { getAllAcrea } from "./redux/actions/acreaActions";
import { getAllProvince } from "./redux/actions/postActions";
import { getCurrent } from "./redux/actions/userActions";




const Home = React.lazy(() => import("./component/page/Home/Home"));
const HomePage = React.lazy(() => import("./component/page/HomePage/HomePage"));
const Login = React.lazy(() => import("./component/page/Login/Login"));
const ProductDetail = React.lazy(() => import("./component/page/Product/ProductDetail"));
const UserManage = React.lazy(() => import("./component/page/userManage/userManager"));
const Rental = React.lazy(() => import("./component/page/Content/Rental"));
const SearchDetails = React.lazy(() => import("./component/SearchDetails/SearchDetails"));
const CreatePost = React.lazy(() => import("./component/SystemManage/CreatePost"));
const EditAccount = React.lazy(() => import("./component/SystemManage/EditAccount"));
const Management = React.lazy(() => import("./component/SystemManage/Management"));
const System = React.lazy(() => import("./component/SystemManage/System"));
const ContactManage = React.lazy(() => import("./component/SystemManage/ContactManage"));


function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.auth.isLogin)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      isLogin && dispatch(getCurrent)
    }, 1000);
  }, [isLogin])

  useEffect(() => {
    setLoading(true)
    const fetch = async () => {
      await dispatch(getAllPrice)
      await dispatch(getAllAcrea)
      await dispatch(getAllProvince)
      setLoading(false)
    }
    fetch()
  }, [])

  if (loading) {
    return <div>Loading...</div>;
  }



  return (
    <Suspense >
      <Routes>
        <Route path={configRouter.home} element={<Home />}>
          <Route path='*' element={<HomePage />} />
          <Route path={configRouter.login} element={<Login />} />
          <Route path={configRouter.userManager} element={<UserManage />} />
          <Route path={configRouter.chothuecanho} element={<Rental />} />
          <Route path={configRouter.chothuematbang} element={<Rental />} />
          <Route path={configRouter.chothuephongtro} element={<Rental />} />
          <Route path={configRouter.nhachothue} element={<Rental />} />
          <Route path={configRouter.seacrh} element={<SearchDetails />} />
          <Route path={configRouter.product_detail} element={<ProductDetail />} />
          <Route path={configRouter.contact} element={<ContactManage />} />
        </Route>
        <Route path={configRouter.system} element={<System />}>
          <Route path={configRouter.createPost} element={<CreatePost />} />
          <Route path={configRouter.Management} element={<Management />} />
          <Route path={configRouter.editAccount} element={<EditAccount />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;

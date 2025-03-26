import React from "react";
import List from "../../../component/ListProduct/List";
import ItemSideBar from "../../ItemSideBar/ItemSideBar";
import { useSelector } from "react-redux";
import NewPost from "../../NewPost/NewPost";
import Search from "../Search/Search";

const HomePage = () => {
  const dataHome = useSelector((state) => state.category.categoryData.response)
  const Price = useSelector((state) => state.price.dataPrice)
  const Acrea = useSelector((state) => state.acrea.data)
  const isLogin = useSelector(state => state.auth.isLogin)

  return (
    <div>
      <div className="container">
        {!isLogin && <Search />}
        <div className="row">
          {/* List Product */}
          <div className="list_product col-12 col-md-12 col-lg-9">
            <List />
          </div>

          {/* Sidebar (ẩn trên màn hình di động và chỉ hiển thị trên md và lg) */}
          <div className="sidebar col-12 col-md-12 col-lg-3 xs:hidden md:hidden">
            <ItemSideBar content={dataHome} tilte='Danh sách cho thuê' />
            <ItemSideBar
              tilte='Xem theo giá'
              content={Price}
              isDouble={true}
              type='priceCode' />
            <ItemSideBar
              tilte='Xem theo diện tích'
              content={Acrea}
              isDouble={true}
              type='areaCode' />
            <NewPost />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

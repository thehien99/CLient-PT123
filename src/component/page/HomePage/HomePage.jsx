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
          <div className="list_product col-8">
            <List />
          </div>
          <div className="sidebar col-4" style={{ borderStyle: "dotted" }}>
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

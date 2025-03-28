import { useSearchParams } from "react-router-dom";
import Item from "../Item/Item";
import Pagination from "../Pagination/Pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { postLimit } from "../../redux/actions/postActions";

const List = ({ categoryCode }) => {
   const post = useSelector((state) => state.post.data.data?.response?.rows)
   const count = useSelector((state) => state.post.data.data?.response?.count)
   const [sort, setSort] = useState(0)
   const [searchParams] = useSearchParams();
   const dispatch = useDispatch()
   useEffect(() => {
      let params = []
      for (let entry of searchParams.entries()) {
         params.push(entry)
      }
      let searchParamsObject = {}
      params?.forEach(i => {
         console.log(Object.keys(searchParamsObject)?.some(item => item === i[0]))
         if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
            searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
         } else {
            searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
            console.log("a", { ...searchParamsObject, [i[0]]: [i[1]] })
         }
      })
      if (categoryCode) searchParamsObject.categoryCode = categoryCode
      if (sort === 1) searchParamsObject.order = ["createdAt", "DESC"]
      dispatch(postLimit(searchParamsObject))
   }, [searchParams, categoryCode, sort]);


   return (
      <div className="w-full">
         <div className="mt-3">
            <div className="">
               <span onClick={() => setSort(0)} className={`ms-2 font-normal border border-[#dedede] rounded-md p-1 cursor-pointer ${sort === 0 && "no-underline bg-red-600 text-white"} `}>
                  Mặc Định
               </span>
               <span onClick={() => setSort(1)} className={` ms-1 font-normal border border-[#dedede] rounded-md p-1 cursor-pointer  ${sort === 1 && "no-underline bg-red-600 text-white"}`}>
                  Mới Nhất
               </span>
            </div >
         </div>

         <div className="w-full mt-4">
            {post?.length > 0 &&
               post.map((item) => {
                  return (
                     <Item
                        key={item.id}
                        title={item?.title}
                        star={+item?.star}
                        address={item?.address}
                        description={JSON.parse(item?.description)}
                        image={JSON.parse(item?.images?.image)}
                        attributes={item?.attributes}
                        sellers={item?.sellers}
                        id={item.id}
                     />
                  );
               })}
         </div>
         <div>
            <Pagination
               count={count}
               post={post}
            />
         </div>
      </div >
   );
};

export default List;

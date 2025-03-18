import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchItem from "./SearchItem";
import icons from "../../../utils/icons";
import Modal from "../../Modal/Modal";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import configRouter from "../../../configRouter";

const {
   ImLocation,
   GrFormNext,
   MdOutlineMapsHomeWork,
   GrMoney,
   RiCrop2Line,
   RiDeleteBack2Line,
   GrSearch,
} = icons;

const Search = () => {
   const [isShowModal, setIsShowModal] = useState(false)
   const [content, setContent] = useState([])
   const [header, setHeader] = useState('')
   const [name, setName] = useState('')
   const [defaultText, setDefauText] = useState('')
   const [queries, setQueries] = useState({})
   const [arrMinMax, setArrMinMax] = useState({})
   const location = useLocation()
   useEffect(() => {
      if (!location?.pathname.includes(configRouter.seacrh)) {
         setArrMinMax({})
         setQueries({})
      }
   }, [location])
   const dataHome = useSelector((state) => state.category.categoryData.response)
   const Price = useSelector((state) => state.price.dataPrice)
   const Acrea = useSelector((state) => state.acrea.data)
   const dataProVince = useSelector(state => state.post.province.data)

   const navigate = useNavigate()

   const handleSubmitModal = useCallback((e, query, arrMaxMin) => {
      e.stopPropagation()
      setQueries(prev => ({ ...prev, ...query }))
      setIsShowModal(false)
      arrMaxMin && setArrMinMax(prev => ({ ...prev, ...arrMaxMin }))
   }, [queries, isShowModal])

   const handleIsShowModal = (content, name, defaultText, header) => {
      setDefauText(defaultText)
      setContent(content)
      setName(name)
      setIsShowModal(true)
      setHeader(header)
   }

   const handleSearch = () => {
      let convertGetCode = Object.entries(queries).filter(item => item[0].includes('Number') || item[0].includes('Code')).filter(item => item[1])
      let convertArrtoObj = {}
      convertGetCode.forEach(item => { convertArrtoObj[item[0]] = item[1] })
      let queryTextArr = Object.entries(queries).filter(item => !item[0].includes('Code') || !item[0].includes('Number'))
      let queryTextObj = {}
      queryTextArr.forEach(item => { queryTextObj[item[0]] = item[1] })

      let titleTextSearch = `${queryTextObj.category ? queryTextObj.category : 'Cho thuê'} 
        ${queryTextObj.province ? queryTextObj.province : ''} 
        Giá ${queryTextObj.price ? queryTextObj.price : ''}, 
        Diện tích ${queryTextObj.area ? queryTextObj.area : ''} `
      navigate({
         pathname: configRouter.seacrh,
         search: createSearchParams(convertArrtoObj).toString()
      }, { state: { titleTextSearch } })
   }

   return (
      <>
         <div className="container xs:flex my-3 bg-[#febb02] rounded-lg  flex items-center justify-evenly cursor-pointer">
            <span className="w-full xs:hidden" onClick={() => handleIsShowModal(dataHome, 'category', 'Tìm tất cả', 'Tìm tất cả')}>
               <SearchItem
                  text={queries.category}
                  iconAfter={<MdOutlineMapsHomeWork />}
                  iconbefore={<RiDeleteBack2Line />}
                  defaultText="Tìm tất cả"
               />
            </span>
            <span className="w-full" onClick={() => handleIsShowModal(dataProVince, 'province', 'Toàn quốc', 'Chọn tỉnh thành')}>
               <SearchItem
                  text={queries.province}
                  iconAfter={<ImLocation />}
                  iconbefore={<GrFormNext />}
                  defaultText="Toàn quốc"
               />
            </span>
            <span className="w-full xs:hidden" onClick={() => handleIsShowModal(Price, "price", "Chọn Giá", 'Chọn Giá')}>
               <SearchItem
                  text={queries.price}
                  iconbefore={<GrFormNext />}
                  iconAfter={<GrMoney />}
                  defaultText="Chọn Giá"
               />
            </span>
            <span className="w-full xs:hidden" onClick={() => handleIsShowModal(Acrea, "area", "Chọn Diện Tích", "Chọn Diện Tích")}>
               <SearchItem
                  text={queries.area}
                  iconAfter={<RiCrop2Line />}
                  iconbefore={<GrFormNext />}
                  defaultText="Diện tích"
               />
            </span>
            <button
               className="w-fit lg:ms-2 p-2 bg-[lightskyblue] rounded-md flex justify-center items-center  "
               onClick={handleSearch}
            >
               <GrSearch style={{ marginBottom: "2px" }} />
            </button>
         </div>
         {isShowModal && <Modal
            content={content}
            name={name}
            queries={queries}
            arrMinMax={arrMinMax}
            setIsShowModal={setIsShowModal}
            handleSubmitModal={handleSubmitModal}
            defaultText={defaultText}
            header={header}
         />
         }
      </>
   );
};

export default Search;

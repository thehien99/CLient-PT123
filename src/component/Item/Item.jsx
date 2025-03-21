import { Link } from "react-router-dom"
import icons from "../../utils/icons"
import { memo, useState } from "react"
import { formatVietnameseToString } from "../../utils/formatVietnameseToString"
import configRouter from "../../configRouter"

const indexs = [0]
const { GrStar, AiOutlineHeart, AiFillHeart } = icons

const Item = ({ image, title, star, address, description, attributes, sellers, id }) => {
  const [isHover, setHover] = useState(false)
  const handleStar = (star) => {
    const stars = []
    for (let i = 1; i <= +star; i++) stars.push(<GrStar color="rgba(245, 199, 39, 0.8)" />)
    return stars
  }
  return (
    <div className="bg-[#fff9f3] p-4 xs:mt-4 sx:p-0">
      <div className="row xs:px-0 p-4 border-2 bg-white shadow-md rounded-md ms-0 me-0  md:flex-col md:gap-7 xs:gap-1">
        <Link
          to={`/${configRouter.detail}/${formatVietnameseToString(title.replaceAll("/", ""))}/${id}`}
          className="relative col-lg-5 col-md-12 flex flex-wrap h-[266px]">
          {image.length > 0 && image.filter((i, index) => indexs.some(i => i === index))?.map((i, index) => {
            return (
              <img key={index} src={i} alt="/" className="rounded-md object-cover my-1 mx-1 w-full h-full" />
            )
          })
          }
          <span className="absolute bottom-0 left-6 border bg-[rgba(0,0,0,.5)] rounded text-white text-sm pointer-events-none">{`${image.length}`} ảnh </span>
          <span className="absolute bottom-0 right-6 ]"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {isHover ? <AiFillHeart size={'24px'} color={'red'} /> : <AiOutlineHeart size={'24px'} />
            }
          </span>
        </Link>
        <div className="col-lg-7 col-md-12 ">
          <div className="lg:mt-5">
            <Link to="/" className="text-decoration-none text-danger">
              <span className="flex">
                {handleStar(+star).length > 0 && handleStar(+star).map((star, index) => {
                  return (
                    <span key={index}>{star}</span>
                  )
                })}
              </span>
              {title}
            </Link>
          </div>
          <div className="mt-2 xl:flex-col xl:gap-2 flex justify-content-between md:flex-col">
            <div className="xs:flex">
              <span className="text-green font-medium w-3/6">
                {attributes.price}
              </span>
              <span className="w-[28%]">{attributes.acreage}</span>
            </div>
            <span>{address}</span>
            <time></time>
          </div>
          <div className="mt-3 xs:hidden">
            <p className="text-[#8a8d91] text-base max-w-lg text-ellipsis leading-6 line-clamp-3">{description}</p>
          </div>
          <div className="flex justify-between items-center xl:flex-col xl:items-start xl:gap-2 ">
            <div>
              <span className="text-[#8a8d91]">{sellers.name}</span>
            </div>
            <div className="flex md:flex-col md:justify-center md:gap-2" >
              <a href={`tel:${sellers?.phone}`} className="no-underline border border-solid border-[blue] bg-blue-500  text-[#fff] py-[2px] px-1 rounded-lg  me-2">Gọi {sellers.phone}</a>
              <a target="_blank" href={`https://zalo.me/${sellers.zalo ? sellers.zalo : sellers.phone}`} className="no-underline border border-solid border-[blue] text-[blue] py-[2px] px-1 rounded-lg  me-2" >Nhắn Zalo</a>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default memo(Item)
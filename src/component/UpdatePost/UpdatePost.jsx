import React from "react";
import CreatePost from "../SystemManage/CreatePost"
const UpdatePost = ({ setIsEdit }) => {
  return (
    <div className="absolute left-0 top-0 bg-overlay-7 flex justify-center w-full h-full"
      onClick={(e) => {
        e.stopPropagation()
        setIsEdit(false)
      }}
    >
      <div className="overflow-y-auto p-3 ">
        <div className="bg-white max-w-1100 w-full sm:w-full  sm:right-[9.5rem] sm:p-3" onClick={e => e.stopPropagation()}>
          <CreatePost isEdit setIsEdit={setIsEdit} />
        </div>
      </div>
    </div>
  )
};

export default UpdatePost;

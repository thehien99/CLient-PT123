import React, { memo } from "react";
import { dataContact } from "../../utils/dataContact";
const Contact = () => {
  return (
    <div className="container mt-3 text-center bg-white shadow-2xl rounded-md" style={{ border: '7px dashed #e8eefc' }}>
      <div className="contact-img">
        <img src={dataContact.img} alt="" style={{ width: '30%', marginLeft: 'auto', marginRight: 'auto' }} />
      </div>
      <div className="call text-center mt-3">
        {dataContact.call}
      </div>

      <div className="contact mt-3 flex justify-center items-center gap-5 md:w-full">
        <div className="flex flex-col">
          <span className="font-bold text-xl">Hỗ trợ đăng tin</span>
          <span>Sdt: 0587691822</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xl">Phản ánh khiếu nại</span>
          <span>Sdt: 12345679</span>
        </div>
      </div>

      <button className="bg-danger p-2 mt-3 text-white fw-bold">
        Gửi Liên Hệ
      </button>
      <div style={{ height: '50px' }}></div>
    </div>
  )
};

export default memo(Contact);

import React, { memo, useEffect, useState } from "react";
import Select from "../SelectManage/Select";
import { apiDistrics, apiProvince, apiWard } from "../../service/ApiProvince/ApiProvince";
import { InPutAddress } from "../InputManage/InputAddress";
import { useSelector } from "react-redux";
import extractHouseNumber from "../../utils/convertAddress";

const Address = ({ setPayload, invalids, setInValids, payload }) => {
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [ward, setWard] = useState('')
  const [resret, setReset] = useState(false)
  const dataEdit = useSelector(state => state.post.postEdit)
  const [numberHome, setNumberHome] = useState('')

  useEffect(() => {
    if (dataEdit) {
      let address = dataEdit?.address?.split(',')
      let provinceFind = provinces?.length > 0 && provinces?.find(item => item.province_name === address[address?.length - 1]?.trim())
      setProvince(provinceFind ? provinceFind.province_id : "")
    }
  }, [provinces, dataEdit])

  useEffect(() => {
    if (dataEdit) {
      let address = dataEdit?.address?.split(',')
      let districtFind = districts?.length > 0 && districts?.find(item => item.district_name === address[address?.length - 2]?.trim())
      setDistrict(districtFind ? districtFind.district_id : "")
    }
  }, [districts, dataEdit])

  useEffect(() => {
    if (dataEdit) {
      let address = dataEdit?.address?.split(',')
      let wardsFind = wards?.length > 0 && wards?.find(item => item.ward_name === address[address?.length - 3]?.trim())
      setWard(wardsFind ? wardsFind.ward_id : "")
    }
  }, [wards, dataEdit])

  useEffect(() => {
    const fecthProvice = async () => {
      const response = await apiProvince()
      if (response.status === 200) setProvinces(response.data.results)
    }
    fecthProvice()
  }, [])

  useEffect(() => {
    setDistrict(null)
    const fetchDistrict = async () => {
      const response = await apiDistrics(province)
      if (response?.status === 200) setDistricts(response?.data?.results)
    }
    province && fetchDistrict()
    !province ? setReset(true) : setReset(false)
    !province && setDistricts([])
  }, [province])

  useEffect(() => {
    setWard(null)
    const fetchWard = async () => {
      const response = await apiWard(district)
      if (response?.status === 200) setWards(response?.data?.results)
    }
    district && fetchWard()
    !district ? setReset(true) : setReset(false)
    !district && setWards([])
  }, [district])

  useEffect(() => {
    setPayload(prev => ({
      ...prev,
      address: `Địa chỉ: ${numberHome} ${ward ? `${wards.find(item => item.ward_id === ward)?.ward_name}, ` : ''}${district
        ? `${districts.find(item => item.district_id === district)?.district_name}, `
        : ""}${province
          ? `${provinces.find(item => item?.province_id === province)?.province_name}` :
          ""}`,
      province: `${provinces.find(item => item?.province_id === province)?.province_name}`,
    }))
  }, [province, district, ward, numberHome])

  const handleChange = (e) => {
    setNumberHome(e.target.value)
  }

  const convertNumberHome = extractHouseNumber(dataEdit?.address)

  return (
    <div className="w-full">
      <h2>Địa Chỉ Cho Thuê</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 address_admin ">
          <Select invalids={invalids} setInValids={setInValids} type='province' value={province} setValue={setProvince} options={provinces} label={'Tỉnh/Thành phố'} />
          <Select invalids={invalids} setInValids={setInValids} resret={resret} type='district' value={district} setValue={setDistrict} options={districts} label={'Quận/Huyện'} />
          <Select invalids={invalids} setInValids={setInValids} resret={resret} type='ward' value={ward} setValue={setWard} options={wards} label={'Phường/Xã/Huyện'} />
        </div>
        <div className="w-[90%] sm:w-full">
          <InPutAddress
            createPost='createPost'
            label={'Địa Chỉ Chính Xác'}
            value={
              ` ${ward ? `${wards.find(item => item.ward_id === ward)?.ward_name},` : ''} ${district
                ? `${districts.find(item => item.district_id === district)?.district_name},`
                : ""}${province
                  ? `${provinces.find(item => item?.province_id === province)?.province_name}` :
                  ""}`
            }
          />
        </div>
        <div className="flex flex-col w-[90%] sm:w-full gap-3">
          <div className="text-xl font-bold">
            Số Nhà
          </div>
          <input
            className="border border-gray-400 w-full p-2 mt-2 rounded-md"
            type="text"
            value={dataEdit ? convertNumberHome : numberHome}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

    </div>
  );
};

export default memo(Address);

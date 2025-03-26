import axiosDefault from 'axios'

export const apiProvince = () => new Promise(async (resolve, reject) => {
  try {
    const response = await axiosDefault({
      method: 'get',
      url: "https://api.vnappmob.com/api/v2/province/",
    })
    resolve(response)
  } catch (error) {
    reject(error)
  }
})

export const apiDistrics = (provinceId) => new Promise(async (resolve, reject) => {
  try {
    const response = await axiosDefault({
      method: 'get',
      url: `https://api.vnappmob.com/api/v2/province/district/${provinceId}`
    })
    resolve(response)
  } catch (error) {
    reject(error)
  }
})

export const apiWard = (districtId) => new Promise(async (resolve, reject) => {
  try {
    const response = await axiosDefault({
      method: 'get',
      url: `https://api.vnappmob.com/api/v2/province/ward/${districtId}`
    })
    resolve(response)
  } catch (error) {
    reject(error)
  }
})


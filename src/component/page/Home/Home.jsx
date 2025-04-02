import React, { useEffect } from 'react'
import Layout from '../../Layout/index'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../../redux/reducers/authReducer'
const Home = () => {
  const dispatch = useDispatch()

  const checkToken = localStorage.getItem('token')
  useEffect(() => {
    if (checkToken) {
      dispatch(loginSuccess(checkToken))
    }
  }, [checkToken])

  return (
    <div className='layout overflow-hidden'>
      <Layout />
    </div>
  )
}

export default Home

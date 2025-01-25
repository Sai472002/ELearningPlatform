import { CheckCircleTwoTone } from '@ant-design/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import verifyBg from "../../Assets/Images/verifyed.jpg"
const VericicationPage = () => {
  return (
    <div className='h-screen w-screen relative flex flex-col md:flex-row items-center md:items-start gap-4 tracking-widest justify-start lg:justify-center p-4'>
    <img src={verifyBg} className='h-fit w-fit lg:h-4/5 lg:w-4/5 absolute object-contain bottom-0'/>
        <h1 className='z-40 lg:text-3xl mt-10 text-xl'>Your email has been verified successfully <CheckCircleTwoTone twoToneColor="#52c41a" /></h1>
        <h1 className='z-40 lg:text-3xl mt-10' >Click <Link to="/login" className='text-Primary underline underline-offset-8 '>here</Link> to login</h1>
    </div>
  )
}

export default VericicationPage
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'

export default function AdminPanel() {
  const navigate = useNavigate()
const user = JSON.parse(localStorage.getItem('userData'))

  useEffect(() => {
    if(!user){
      navigate('/login')
    }
  },[navigate, user])
  return (
    
    <div className='main'>

{/* <nav className="navbar bg-body-tertiary">
  <div className="container-fluid">
    <span className="navbar-brand mb-0 h1">Admin</span>
  </div>
</nav> */}
      
    <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
      <div style={{width: '15%'}}>
       <Sidebar/>
      </div>
      <div style={{width: '85%'}}>
       <Outlet/>
      </div>
    </div>
    
    </div>
  )
}

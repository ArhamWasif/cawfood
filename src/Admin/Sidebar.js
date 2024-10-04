
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './Sidebar.css'
import {  Create, Dashboard, Home, Logout, Storefront } from '@mui/icons-material';
export default function Sidebar() {
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    localStorage.clear()
    navigate("/login")
}
let navigate = useNavigate();
  return (
    <div className="main">
    {/* <div className="logo">Your Logo</div> */}
    <div className="menu ">
      <div  style={{fontSize:'35px', color:'wheat'}}>Moon</div>
      
      <Link to='/admin' className="menuItem"><div><Dashboard/></div><span>Dashboard</span></Link>
     <Link to='/' className="menuItem"><div><Home/></div><span>Home</span></Link>
      <Link to='create' className="menuItem "><div><Create/></div><span>Create</span></Link>
       <Link to='products' className="menuItem " ><div><Storefront/></div><span>Products</span></Link>
      
      
      <button onClick={handleLogout} className="logout"><div><Logout/></div><span>Logout</span></button>
    </div>
  </div>
  )
}

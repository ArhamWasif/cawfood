import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cart from '../screens/Cart';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import { useCart } from './ContextReducer';
import { ShoppingCart } from '@mui/icons-material';



// const handleLogout = () => {
//     localStorage.removeItem('authtoken')

//     navigate("/login")
// }


export default function Navbar(props) {
    localStorage.setItem('temp',"first")
    // let data = useCart();
    let navigate = useNavigate();
    const [cartView, setCartView] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate("/login")
    }
    const loadCart = () => {
        setCartView(true)
    }

    const items = useCart();

    return (
        <div><nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky"
            style={{ boxShadow: "0px 10px 20px black", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
            <div className="container-fluid">
                <Link className="navbar-brand fs-1 fst-italic" to="/">Caw Food</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">Home</Link>  {/* index.css - nav-link color white */}
                        </li>


                        {(localStorage.getItem("token")) ?
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myOrders">My Orders</Link>  
                            </li> : ""}
                    </ul>
                    {(!localStorage.getItem("token")) ?
                        <div className='d-flex'>
                            <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
                            <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
                        </div>
                        :

                        <>
                            <div><button className="btn bg-white text-success mx-2"   onClick={loadCart}  >
                            <Badge pill bg="danger" content={items.length} style={{ fontSize: '12px', marginRight: '5px' }}>
    <ShoppingCart style={{ fontSize: '15px', transform: 'scale(1.5)' }} />
  </Badge>
                              My Cart
                            </button>
                                {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
                            </div>
                            <button onClick={handleLogout} className="btn bg-white text-success mx-2"  >Logout</button>
                            <div className="d-flex align-items-center">
  
</div>
                        </>

                    }
                </div>

            </div>
        </nav>

        </div>
    )
}

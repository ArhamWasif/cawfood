import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { DeleteSharp } from '@mui/icons-material';
import './Cart.css'
const EmptyCartModal = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>Thanks for ordering your order confirmed!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
const ConfirmationModal = ({ show, onClose, onConfirm }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to confirm the order?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default function Cart() {
  const [userName, setUserName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  let data = useCart();
  let dispatch = useDispatchCart();

  // Show the EmptyCartModal if the cart is empty
  // useEffect(() => {
  //   if (data.length === 0) {
  //     setShowEmptyCartModal(true);
  //   }
  // }, [data]);

  // Rest of your Cart component code...

  if (data.length === 0) {
    return (
      <div>
        <div className='m-6 w-100 text-center fs-3' style={{ color: 'cornsilk' }}>Cart is Empty</div>
        <EmptyCartModal
          show={showEmptyCartModal}
          onClose={() => setShowEmptyCartModal(false)}
        />
      </div>
    );
  }

  // Rest of your Cart component code...
  const handleCheckOut = async () => {
    
    const orderData = data?.map((item) => {
      return {
        ...item,
        userName,
        address,
        city,
        postalCode,
        phoneNumber
      }
    })
    let userEmail = localStorage.getItem("userEmail")

    let response = await fetch("http://localhost:5000/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: orderData,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });

   
    if (response.status === 200) {
      dispatch({ type: "DROP" })
      setShowConfirmation(true);
      // alert("thanks for ordering")
    } 
    
  }
  const handleOpenConfirmation = () => {
    if (!address && !city) {
      alert('Please enter your address')
      return
    }
    setShowConfirmation(true);
    // alert("thanks for ordering")
    
    // Close the confirmation popup
  };
  // const handleCloseConfirmation = () => {
  //   setShowConfirmation(false); // Close the confirmation popup
  // };

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    // Rest of your Cart component JSX...
    <div>
   
      <div className='container1 cart m-auto mt-5'>
      <div className='table-responsive'>
        <div className='table-container' >
          <table className='table table-hover'>
            {/* Table header remains the same */}
            <thead className='text-success fs-4' >
              <tr>
              <th scope='col'>#</th>
             <th scope='col'>Name</th>
               <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
               <th scope='col'>Amount</th>
             <th scope='col'></th>
              </tr>
            </thead>
            <tbody style={{overflow:'auto'}}>
              {data.map((food, index) => (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td>{food.name}</td>
                  <td>{food.qty}</td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td>
                    <button type="button" className="btn p-0" style={{ color: 'Highlight' }}>
                      <DeleteSharp onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h1 className='fs-2' style={{ color: 'darkturquoise', fontStyle: "italic" }}>
          Total Price: {totalPrice}/=
        </h1>
      </div>
      <div>
      <h5 style={{ color: 'darkturquoise',marginTop:5 }}>
          Payment Method
          <div style={{color:"wheat"}}>
            <li>COD</li>
          </div>
        </h5>
      <div className='shipping-details'>
        
        <div>
          <h3 style={{ color: 'darkturquoise', fontStyle: "italic" }}>Shipping Details</h3>
          <div className="form-group">
          <input
                type="text"
                id="name"
                placeholder='Name'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="form-group" style={{ marginTop: 10 }}>
              <input
                type="text"
                id="address"
                placeholder='Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group" style={{ marginTop: 10 }}>
              <input
                type="text"
                id="city"
                placeholder='City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="form-group" style={{ marginTop: 10 }}>
              <input
                type="text"
                id="postalCode"
                placeholder='Postal Code'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            
          </div>
          <div className="form-group" style={{ marginTop: 10 }}>
              <input
                type="text"
                id="phoneNumber"
                placeholder='Phone Number'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            
          </div>
          </div>
        </div>
        <button className='btn bg-success mt-5 ' onClick={handleOpenConfirmation}>Checkout</button>
        
        
      </div>
    </div>
    <ConfirmationModal
      show={showConfirmation}
      onClose={() => setShowConfirmation(false)}
      onConfirm={handleCheckOut}
    />
    </div>
  );
}
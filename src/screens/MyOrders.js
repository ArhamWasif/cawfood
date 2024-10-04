import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect } from 'react';

export default function MyOrders() {
    const [orderData, setOrderData] = useState("");
    const fetchMyOrder = () => {
        console.log(localStorage.getItem('userEmail'))
        fetch("http://localhost:5000/api/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            
            setOrderData(response)
        })
    }
    useEffect(() => {
        fetchMyOrder()
    }, [])

    
    return (
        <>
            <div>
                <Navbar />
            </div>

            <div className='conatainer'>
                <div className='row'>

                    {orderData?.orderData ? orderData.orderData.order_data?.slice(0)?.reverse().map((item) =>
                        item.Order_date ? <div className='m-auto mt-5'>
                            {item?.Order_date}
                            <hr />
                        </div> :

                            <div className='col-12 col-md-6 col-lg-3' >
                                {console.log(item)}
                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                    {/* <img src={`http://localhost:5000/api/image/${item?.img?.split('').slice(8).join('')}`} className="card-img-top" alt="..." 
                                    style={{ height: "120px", objectFit: "fill" }} /> */}
                                    <div className="card-body">
                                        <h5 className="card-title">{item?.name}</h5>
                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                            <span className='m-1'>{item?.qty}</span>
                                            <span className='m-1'>{item?.size}</span>
                                            {/* // <span className='m-1'>{orderData}</span> */}
                                            <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                Rs.{item.price}/-
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                    ) : null}



                </div>

            </div>
            <div><Footer /></div>



        </>
    )
}

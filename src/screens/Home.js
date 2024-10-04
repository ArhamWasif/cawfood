import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Cards from '../components/Cards'
import pic1 from '../images/pic1.jpg'

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const load = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/get/product", {
        method: 'GET',
      });
      response = await response.json();
      if (response.data) {
        setFoodItems(response.data[0]);
        setFoodCat(response.data[1]);
      } else {
        console.error("Data format error:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div style={{ boxShadow: "0px 10px 20px black", position: "fixed", zIndex: "10", width: "100%" }}>
        <Navbar />
      </div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-item active">
              <img src={pic1} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="carousel slide 1" />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="carousel slide 2" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {
          foodCat.length > 0 ?
            foodCat.map((category) => (
              <div key={category._id} className='row mb-3'>
                <div className='fs-3 m-3'>{category.CategoryName}</div>
                <hr />
                {
                  foodItems.length > 0 ?
                    foodItems.filter(item => item.category === category.CategoryName)
                      .map(filteredItem => (
                        <div key={filteredItem._id} className='col-12 col-md-6 col-lg-3'>
                          <Cards
                            foodItem={filteredItem}
                            options={filteredItem.options[0]}
                          />
                        </div>
                      )) :
                    <div>No Such Data Found</div>
                }
              </div>
            )) : <div>Loading...</div>
        }
      </div>
      <Footer />
    </div>
  )
}

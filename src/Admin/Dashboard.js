// import React from 'react';
// import './Dashboard.css';

// const Dashboard = () => {
//   return (
//     <div className="dashboard">
//       <div className="card orders">
//         <h2>Orders</h2>
//         <p>Number of orders: 100</p>
//       </div>
//       <div className="card customers">
//         <h2>Customers</h2>
//         <p>Total customers: 50</p>
//       </div>
//       <div className="card revenue">
//         <h2>Revenue</h2>
//         <p>Total revenue: $5000</p>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // Dummy data for recent orders
  // const recentOrders = [
  //   { title: 'Product 1', quantity: 2, price: 20 },
  //   { title: 'Product 2', quantity: 1, price: 15 },
  //   { title: 'Product 3', quantity: 3, price: 10 },
  // ];

  // Basic analytics
  // const totalOrders = recentOrders.length;
  // const totalRevenue = recentOrders.reduce((acc, order) => acc + order.quantity * order.price, 0);

  return (
    <div className="dashboard">
      <div className="overview">

        <div className="card1">
          <h2>Orders</h2>
          <p>Number of orders:20+</p>
        </div>
        <div className="card1 ">
          <h2>Customers</h2>
          <p>Total customers:6</p>
        </div>
        <div className="card1 ">
          <h2>Revenue</h2>
          <p>Total revenue:2500+</p>
        </div>

      </div>
      <div className="row">
        <div className="column">
          <div className="recent-orders">
            <h2>Recent Orders</h2>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <td>Chicken Supereme Pizza</td>

                  <td>1</td>
                  <td>Rs.520</td>
                </tr>
                <tr >
                  <td>Veg Biryani</td>

                  <td>2</td>
                  <td>Rs.640</td>
                </tr>
                <tr >
                  <td>Orange Juice</td>

                  <td>3</td>
                  <td>Rs.270</td>
                </tr>


              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

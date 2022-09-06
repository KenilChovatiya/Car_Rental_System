import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import "./Dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { Doughnut, Line } from "react-chartjs-2";
import { getAdminCars } from '../../actions/carAction';
import { getAdminReservations } from '../../actions/reservationAction';
import { getAllUsers } from '../../actions/userAction';
import { Link } from 'react-router-dom';

function Dashboard() {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.cars);
  const { bookedCars } = useSelector((state) => state.allBookedCars);
  const { users } = useSelector((state) => state.allUsers);


  let totalAmount = 0;
  bookedCars &&
    bookedCars.forEach((item) => {
      totalAmount += item.rentalFee;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["rgb(32,168,217)"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  let outOfStock = 0;

  cars &&
    cars.forEach((item) => {
      if (item.numInStock === 0) {
        outOfStock += 1;
      }
    });

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        // backgroundColor: ["#00A6B4", "#6800B4"],
        backgroundColor: ["#6800B4", "rgb(32,168,217)"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, cars.length - outOfStock],
      },
    ],
  };


  useEffect(() => {
    dispatch(getAdminCars());
    dispatch(getAdminReservations());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <div className='dashboard'>
        <Sidebar />

        <div className='right_side'>
          <div className='container-fluid'>
            <div className='p-3 dashboard_title mb-3'>
              <h5 className='m-0 text-white'>Dashboard</h5>
            </div>

            <div className='d_grid dashboard_summary_boxes'>
              <Link to="/admin/reservations" className='dashboard_summary_box'>
                <h4 className='text-white'> New Reservation</h4>
                <p className='text-white'>{!bookedCars ? "0" : bookedCars.length}</p>
              </Link>
              <Link to="/admin/cars" className='dashboard_summary_box'>
                <h4 className='text-white'>Total Cars</h4>
                <p className='text-white'>{!cars ? "0" : cars.length}</p>
              </Link>
              <Link to="/admin/users" className='dashboard_summary_box'>
                <h4 className='text-white'>Total User</h4>
                <p className='text-white'>{!users ? "0" : users.length}</p>
              </Link>
            </div>

            <div className='my-5 d_grid charts'>
              <div className="lineChart">
                <Line data={lineState} />
              </div>
              <div className="doughnutChart">
                <Doughnut
                  data={doughnutState}
                  options={
                    {
                      plugins: {
                        legend: {
                          position: 'bottom'
                        }
                      }
                    }
                  }
                />
              </div>
            </div>  
          </div>
        </div>
      </div>

    </>
  )
}

export default Dashboard
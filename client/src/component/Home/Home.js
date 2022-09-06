import React, { useEffect } from 'react'
import "./Home.css";
import { Link, useNavigate  } from "react-router-dom";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CarCard from './CarCard';
import { useSelector, useDispatch } from "react-redux";
import { getCars } from '../../actions/carAction';
import { HashLoader, RingLoader } from "react-spinners";
import { useAlert } from 'react-alert';
import Steps from '../Utility/Steps';
import News from '../Utility/News';
import { useState } from 'react';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import CarRepairOutlinedIcon from '@mui/icons-material/CarRepairOutlined';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';

const carTypes = [
  {
    value: 'Hatchback',
    label: 'Hatchback',
  },
  {
    value: 'Sedan',
    label: 'Sedan',
  },
  {
    value: 'SUV',
    label: 'SUV',
  },
  {
    value: 'MUV',
    label: 'MUV',
  },
  {
    value: 'Coupe',
    label: 'Coupe',
  },
  {
    value: 'Convertibles',
    label: 'Convertibles',
  },
  {
    value: 'Pickup',
    label: 'Pickup Trucks',
  },
];

function Home() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate =  useNavigate();
  const [carType, setCarType] = useState('');
  const [carName, setCarName] = useState('');
  let k = 1;
  const { loading, error, cars } = useSelector((state) => state.cars);

  useEffect(() => {
    if (error) {
      alert.error("Some Error Ocuured");
      // dispatch(clearErrors());
    }
    dispatch(getCars());
  }, [dispatch, error])

  const onSubmit = (e) => {
    e.preventDefault();
    if (carName.trim() && carType) {
      navigate(`/cars?name=${carName}&type=${carType}`);
    } else {
      navigate(`/cars`);
    }
  }


  return (
    <>
      {loading ? <div className='loader'><HashLoader size={50} color={"#20A8D9"} /></div> : (

        <>
          <section className='home_banner'>
            <div className='container'>
              <div className='home_content text-white w-75 text-md-left text-center'>
                <h4 className='text-white'>First class car rental service</h4>
                <h1 className='heading_h1 w-50 mt-3 heading_h1_banner'>THE EASY WAY TO <br /> TAKEOVER A LEASE</h1>
                <div className='w-50 mt-5 text-left find_form_banner'>
                  <form onSubmit={onSubmit}>
                    <div className="form-group">
                      <label>Select Car Type</label>
                      <select className="form-control border_radius-12" id=""
                        value={carType}
                        onChange={(e) => setCarType(e.target.value)}
                      >
                        <option>Select Car Type</option>
                        {carTypes.map((type) => { return <option value={type.value}>{type.label}</option> })}
                      </select>
                    </div>

                    <div className='form-group'>
                      <label htmlFor="">Car Name</label>
                      <input type="text" className='form-control border_radius-12' name="" placeholder='Car Name' value={carName} onChange={(e) => setCarName(e.target.value)} />
                    </div>

                    <button type="submit" className="btn btn-block common_btn my-4">Find It Now</button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          <section className='featured_products my-5'>
            <div className='container'>
              <div className='d-flex justify-content-between align-items-center heading_cars'>
                <h2 className=''>Featured Cars</h2>
                <Link to="/cars" className='text-muted'>View More <ArrowRightAltIcon sx={{ verticalAlign: "middle" }} /></Link>
              </div>
              <div className='cars'>
                <div className='row'>
                  {cars && cars.map((car, i) => { return i < 3 && <CarCard car={car} key={car._id} /> })}
                </div>
              </div>
            </div>
          </section>

          <section className='featured_products my-5'>
            <div className='container'>
              <div className='d-flex justify-content-between align-items-center heading_cars'>
                <h2 className=''>Luxary Cars</h2>
                <Link to="/cars" className='text-muted'>View More <ArrowRightAltIcon sx={{ verticalAlign: "middle" }} /></Link>
              </div>
              <div className='cars'>
                <div className='row'>
                  {cars && cars.map((car, i) => {
                    return (
                      car.dailyRentalRate > 4900 && k++ <= 3 && <CarCard car={car} key={car._id} />
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          <Steps />

          <section className="services_section">
                <div className="container">
                    <div className="features_content">
                      <h2 className='mb-5'>Our Services</h2>
                        <div className="services_item_row">
                            <div className='row'>
                                <div className='col-md-4 col-6'>
                                    <div className="services_item">
                                        <SupportAgentOutlinedIcon />
                                        <h4 className="heading_h4 my-3">24 Hour Support</h4>
                                        <p className="txt_p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, et dolore magna
                                            aliqua. Ut enim ad minim.</p>
                                    </div>


                                </div>
                                <div className='col-md-4 col-6'>
                                    <div className="services_item">
                                        <CarRepairOutlinedIcon />
                                        <h4 className="heading_h4 my-3">Well Maintained Cars</h4>
                                        <p className="txt_p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, et dolore magna
                                            aliqua. Ut enim ad minim.</p>
                                    </div>
                                </div>
                                <div className='col-md-4 col-6'>
                                    <div className="services_item">
                                        <MilitaryTechOutlinedIcon />
                                        <h4 className="heading_h4 my-3">Quality Assurance</h4>
                                        <p className="txt_p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, et dolore magna
                                            aliqua. Ut enim ad minim.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

          <News />
        </>
      )}
    </>
  )
}

export default Home
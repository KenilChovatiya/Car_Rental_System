import React from 'react';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import ContactlessOutlinedIcon from '@mui/icons-material/ContactlessOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import "./Utility.css";

function Steps() {
    return (
        <section className='steps mb-5'>
            <div className='container'>
                <h2>Get started with 4 simple steps</h2>
                <div className="mt-5 text-md-left text-center steps_content">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 mt-lg-0 mt-3">
                            <div className="step_item  p-4">
                                <div className="step_icon step_icon1 ">
                                    <PersonAddAltOutlinedIcon />
                                </div>

                                <h5 className="mt-3">Create a profile</h5>
                                <p className="card-text text_p text-muted mt-3">Lorem ipsum dolor sit amet, consectetur
                                    adipis Lorem ipsum dolor sit amet</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mt-lg-0 mt-3">
                            <div className="step_item  p-4">
                                <div className="step_icon step_icon2">
                                    <DirectionsCarOutlinedIcon />
                                </div>

                                <h5 className="mt-3">Tell us what car you want</h5>
                                <p className="card-text text_p text-muted mt-3">Lorem ipsum dolor sit amet, consectetur
                                    adipig Lorem ipsum dolor sit amet</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mt-lg-0 mt-3">
                            <div className="step_item  p-4">
                                <div className="step_icon step_icon3">
                                    <ContactlessOutlinedIcon />
                                </div>

                                <h5 className="mt-3">Match with seller</h5>
                                <p className="card-text text_p text-muted mt-3">Lorem ipsum dolor sit amet, consectetur
                                    adipig Lorem ipsum dolor sit amet </p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mt-lg-0 mt-3">
                            <div className="step_item  p-4">
                                <div className="step_icon step_icon4">
                                    <FactCheckOutlinedIcon />
                                </div>

                                <h5 className="mt-3">Make a deal</h5>
                                <p className="card-text text_p text-muted mt-3">Lorem ipsum dolor sit amet, consectetur
                                    adipis elit Lorem ipsum dolor sit amet</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Steps
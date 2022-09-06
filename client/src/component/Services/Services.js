import React from 'react'
import service_bg from "../../images/service_bg1.png";
import "./Services.css";
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import CarRepairOutlinedIcon from '@mui/icons-material/CarRepairOutlined';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import Steps from '../Utility/Steps';

function Services() {
    return (
        <>
            <section className='service_section1'>
                <div className='container'>
                    <div className='d_grid my-5 service_banner_content'>
                        <div>
                            <h1>Our Services</h1>
                            <p>Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</p>
                        </div>
                        <div>
                            <img src={service_bg} className="w-100" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="services_section">
                <div className="container">
                    <div className="features_content">
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

            <Steps />
        </>
    )
}

export default Services
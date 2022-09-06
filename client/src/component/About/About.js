import React from 'react'
import about from "../../images/about2-removebg-preview.png";
import workimg1 from "../../images/workimg1.jpg";
import workimg2 from "../../images/workimg2.jpg";
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import "./About.css";
import News from '../Utility/News';
import userimg from "../../images/user.jpg";
import StarIcon from '@mui/icons-material/Star';

function About() {
    return (
        <>
            <section className='about_banner'>
                <div className='container'>
                    <div className='d_grid my-5 about_banner_content'>
                        <div>
                            <h1>About Us</h1>
                            <p>Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</p>
                        </div>
                        <div>
                            <img src={about} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="work_section2 text-lg-left text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <img src={workimg1} className="work_img1" />
                        </div>

                        <div className="col-lg-6 mt-lg-0 mt-3">
                            <p className="mb-0 li_p"> Areas of practice</p>
                            <h3 className="heading_h3 font-weight-bold">We're good at these areas to work</h3>
                            <h5 className="font-weight-bold color_main my-4">We empower people to unite around ideas that
                                matter to them and together.</h5>

                            <div className="media text-left">
                                <div className="suceess_icon_div shadow mr-4">
                                    <DoneOutlinedIcon style={{ color: "rgb(32, 168, 217)" }} />
                                </div>
                                <div className="media-body">
                                    <h5 className="mt-0 font-weight-bold">Business process</h5>
                                    <p className="mt-3">Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                        ante sollicitudin. Cras purus odio.</p>
                                </div>
                            </div>

                            <div className="media mt-3 text-left">
                                <div className="suceess_icon_div shadow mr-4">
                                    <DoneOutlinedIcon style={{ color: "rgb(32, 168, 217)" }} />
                                </div>
                                <div className="media-body">
                                    <h5 className="mt-0 font-weight-bold">Business process</h5>
                                    <p className="mt-3">Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                        ante sollicitudin. Cras purus odio.</p>
                                </div>
                            </div>

                            <hr className="bg-light mt-3" />

                            <div className="media mt-5 flex-sm-row flex-column align-items-sm-start align-items-center">
                                <img className="mr-sm-3 mr-0 work_img2" src={workimg2} />
                                <div className="media-body mt-sm-0 mt-4">
                                    <h5 className="mt-0 ml-3 font-weight-bold">Our mission is to become the best web design agency
                                        in the world</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="testimonials_section my-5">
                <div class="container">
                    <div class="service_content pb-4">
                        <h2 class="heading_h2">Testimonials what clients say</h2>

                        <div class="testimoial_row text-left">
                            <div class="row">
                                <div class="col-md-4 col-sm-6 testimonial_item">
                                    <div class="testimonial_inner_item">
                                        <p class="txt_p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, et dolore
                                            magna aliqua. Ut enim ad minim.Lorem ipsum dolor sit amet, consectetur adipiscing
                                            elit, et dolore magna aliqua. Ut enim ad minim.</p>
                                        <StarIcon style={{color: "rgb(32, 168, 217", marginBottom: "10px"}}  />
                                        <StarIcon style={{color: "rgb(32, 168, 217", marginBottom: "10px"}}  />
                                        <StarIcon style={{color: "rgb(32, 168, 217", marginBottom: "10px"}}  />
                                        <StarIcon style={{color: "rgb(32, 168, 217", marginBottom: "10px"}}  />
                                        <StarIcon style={{color: "rgb(32, 168, 217", marginBottom: "10px"}}  />
                                        <p class="txt_p"><b>5.0</b> BizBite</p>
                                    </div>

                                    <div class="d-flex testimonial_member">
                                        <img src={userimg} />
                                        <div className=''>
                                             <h5 class="heading_h4 m-0">Austin Caser</h5>
                                            <p class="heading_p">ThemeTags</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-6 testimonial_item">
                                    <div class="testimonial_inner_item">
                                        <p class="txt_p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, et dolore
                                            magna aliqua. Ut enim ad minim.Lorem ipsum dolor sit amet, consectetur adipiscing
                                            elit, et dolore magna aliqua. Ut enim ad minim.</p>
                                        <StarIcon style={{color: "rgb(32, 168, 217", marginBottom: "10px"}}/>
                                        <StarIcon style={{color: "rgb(32, 168, 217", marginBottom: "10px"}}/>
                                        <StarIcon style={{color: "rgb(32, 168, 217", marginBottom: "10px"}}/>
                                        <StarIcon style={{color: "rgb(32, 168, 217", marginBottom: "10px"}}/>
                                        <StarIcon style={{color: "rgb(32, 168, 217", marginBottom: "10px"}}/>
                                        <p class="txt_p"><b>5.0</b> BizBite</p>
                                    </div>
                                    <div class="d-flex testimonial_member">
                                        <img src={userimg} />
                                        <div>
                                             <h5 class="heading_h4 m-0">Austin Caser</h5>
                                            <p class="heading_p">ThemeTags</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-6 testimonial_item">
                                    <div class="testimonial_inner_item">
                                        <p class="txt_p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, et dolore
                                            magna aliqua. Ut enim ad minim.Lorem ipsum dolor sit amet, consectetur adipiscing
                                            elit, et dolore magna aliqua. Ut enim ad minim.</p>
                                        <StarIcon style={{color: "rgb(32, 168, 217", marginBottom: "10px"}}  />
                                        <StarIcon style={{color: "rgb(32, 168, 217", marginBottom: "10px"}}  />
                                        <StarIcon style={{color: "rgb(32, 168, 217", marginBottom: "10px"}}  />
                                        <StarIcon style={{color: "rgb(32, 168, 217", marginBottom: "10px"}}  />
                                        <StarIcon style={{color: "rgb(32, 168, 217", marginBottom: "10px"}}  />
                                        <p class="txt_p"><b>5.0</b> BizBite</p>
                                    </div>
                                    <div class="d-flex testimonial_member">
                                        <img src={userimg} />
                                        <div>
                                             <h5 class="heading_h4 m-0">Austin Caser</h5>
                                            <p class="heading_p">ThemeTags</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <News />

        </>
    )
}

export default About;
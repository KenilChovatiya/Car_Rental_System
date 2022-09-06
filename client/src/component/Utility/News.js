import React from 'react';
import newsimg1 from "../../images/newsimg1.jpg";
import newsimg2 from "../../images/newsimg2.png";
import newsimg3 from "../../images/meetingimg1.jpg";
import "./Utility.css"

function News() {
    return (
        <section className="news_section mb-5">
            <div className="container">
                <div className="news_content text-md-left text-center">
                    <h2 className="heading_h2">Our Latest News</h2>
                    {/* <p className="heading_p w_70_p text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit.</p> */}
                    <div className="blog_content">
                        <div className="row text-left">
                            <div className="col-lg-4 col-md-6 my-3">
                                <div className="thumbnail myThumbnail">
                                    <div className="news_img">
                                        <img src={newsimg1} />
                                        <span className="badge  badge-primary">Lifestyle</span>
                                    </div>
                                    <div className="caption">
                                        <h4 className="heading_h4">Appropitely Productize Fully </h4>
                                        <p className="text-muted">jan 21,2019 &nbsp; 45Comments &nbsp; 10Share</p>
                                        <p className="txt_p text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                            consectetur elit Lorem ipsum dolor sit amet.</p>
                                        <a href="#" className='text-dark'>Read More </a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 my-3">
                                <div className="thumbnail myThumbnail">
                                    <div className="news_img">
                                        <img src={newsimg2} />
                                        <span className="badge  badge-danger">Technology</span>
                                    </div>
                                    <div className="caption">
                                        <h4 className="heading_h4">Qucikly formule backend</h4>
                                        <p className="text-muted">jan 21,2019 &nbsp; 45Comments &nbsp; 10Share</p>
                                        <p className="txt_p text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                            consectetur elit Lorem ipsum dolor sit amet.</p>
                                        <a href="#" className='text-dark'>Read More</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 my-3">
                                <div className="thumbnail myThumbnail">
                                    <div className="news_img">
                                        <img src={newsimg3} />
                                        <span className="badge  badge-info">Science</span>
                                    </div>
                                    <div className="caption">
                                        <h4 className="heading_h4">Objectively extend extensive</h4>
                                        <p className="text-muted">jan 21,2019 &nbsp; 45Comments &nbsp; 10Share</p>
                                        <p className="txt_p text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                            consectetur elit Lorem ipsum dolor sit amet.</p>
                                        <a href="#" className='text-dark'>Read More </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default News
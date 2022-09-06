import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import profileimg from "../../images/user.jpg";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { loadUser } from "../../actions/userAction";
import {HashLoader, RingLoader } from "react-spinners";

function Profile() {
    const dispatch = useDispatch();
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }

    }, [navigate, isAuthenticated]);

    return (
        <>
            {loading ? <div className='loader'><HashLoader size={50} color={"#20A8D9"} /></div> : (
                <div className="container">
                    <h2 className="mt-4 text-sm-left text-center">My Profile</h2>
                    <div className="profile_main my-4 mb-5 pb-4">
                        <div className="row align-itmes-center">
                            <div className="col-lg-4 col-md-5">
                                <div className="profile_left text-center">
                                    <div className="profile_img">
                                        <img src={user.avatar.url ? user.avatar.url : profileimg} />
                                    </div>
                                    <h4 className="text-white my-4">{user.username}</h4>
                                    <Link to="/me/update" className="btn border_radius-12"> <ModeEditOutlineOutlinedIcon /> Edit Profile</Link>
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-7">
                                <div className="profile_right mt-md-0 mt-4">
                                    <h4>Informtion</h4>
                                    <hr />
                                    <div className="profile_info">
                                        <div className="d_grid profile_ingo_gird">
                                            <div>
                                                <h4>User Name</h4>
                                                <p>{user.username}</p>
                                            </div>
                                            <div>
                                                <h4>Email</h4>
                                                <p>{user.email}</p>
                                            </div>
                                            <div>
                                                <h4>Mobile</h4>
                                                <p>{user.mobile}</p>
                                            </div>
                                            <div>
                                                <h4>Joined On</h4>
                                                <p>{new Date(user.createdAt).toDateString()}</p>
                                            </div>
                                        </div>

                                        <h4 className="mt-4">Setting</h4>
                                        <hr />
                                        <div className="setting_profile mt-4">
                                            <div>
                                                <Link to="/myBookedCars" className="btn common_btn btn-block btn_setting"><ListAltOutlinedIcon /> My Orders</Link>
                                            </div>
                                            <div className="my-3">
                                                <Link to="/password/update" className="btn btn-block common_btn btn_setting"><ModeEditOutlineOutlinedIcon /> Change Password</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Profile;
import React from 'react'
import logo from "../../images/user.jpg";
import sideBarImg from "../../images/side-bkg.png";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

function Sidebar() {
    return (
        <>
            <div className='sidebar p-4 d-lg-inline-block d-none'>
                <div className='sidbar_menu'>
                    <ul className='p-0'>
                        <li>
                            <Link to="/admin/dashboard"><DashboardIcon style={{marginRight: "5px"}} /> Dashboard</Link>
                        </li>
                        <li>

                            <TreeView
                                defaultCollapseIcon={<ExpandMoreIcon style={{marginRight: "5px"}} />}
                                defaultExpandIcon={<ImportExportIcon style={{marginRight: "5px"}} />}
                            >
                                <TreeItem nodeId="1" label="Cars">
                                    <Link to="/admin/cars" >
                                        <TreeItem nodeId="2" label="All Cars" className='my-4' icon={<PostAddIcon />} />
                                    </Link>

                                    <Link to="/admin/car">
                                        <TreeItem nodeId="3" label="Create Car" className='mt-4' icon={<AddIcon />} />
                                    </Link>
                                </TreeItem>
                            </TreeView>
                        </li>
                        <li>
                            <Link to="/admin/reservations"><ListAltIcon style={{marginRight: "5px"}} /> Reservations</Link>
                        </li>
                        <li>
                            <Link to="/admin/users"><PeopleIcon style={{marginRight: "5px"}} /> Users</Link>
                        </li>
                    </ul>
                    <div>
                        <img src={sideBarImg} className="w-100" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;
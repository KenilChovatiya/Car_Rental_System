import React, { useState } from 'react'
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserOptions from './usersOptions';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import logo from "../../../images/logo2.png";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.65),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.05),
    },
    marginLeft: 0,
    width: '100%',
    borderRadius: "12px",
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading, isAuthenticated, user } = useSelector((state) => state.user)
    const [keyword, setKeyword] = useState("");
    const onSubmit = (e) => {
        // e.preventDefault();
        if (keyword.trim()) {
            navigate(`/cars/${keyword}`);
        } else {
            navigate(`/cars`);
        }
        setKeyword("");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light py-3 my_navbar">
                <div className='container'>
                    <Link className="navbar-brand" to="/">  <img src={logo} className="logo" /> </Link>
                    {/* <Link className="navbar-brand" to="/"> <h4 className='m-0 logo'><b className='font-weight-bolder color_main'>S</b>avaari</h4></Link> */}
                    <button className="navbar-toggler order-first" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target={!isAuthenticated && "#account"} aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        {isAuthenticated ? <UserOptions user={user} /> : <AccountCircleIcon />}
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item ">
                                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cars">Cars</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/services">Services</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>


                            {
                                user?.role == "admin" &&
                                <>
                                    {/* <hr style={{backgroundColor: "#cac4c4", height: "100%"}}/> */}
                                    <li className='d-lg-none d-inline-block'>
                                        <ul className='navbar-nav'>
                                            <li className="nav-item" >
                                                <Link to="/admin/dashboard" className="nav-link"> Dashboard</Link>
                                            </li>
                                            <li className="nav-item" >

                                                <TreeView
                                                    defaultCollapseIcon={<ExpandMoreIcon style={{ marginRight: "5px" }} />}
                                                    defaultExpandIcon={<ImportExportIcon style={{ marginRight: "5px" }} />}
                                                >
                                                    <TreeItem nodeId="1" label="Cars" className='my-3'>
                                                        <Link to="/admin/cars" className="nav-link">
                                                            <TreeItem nodeId="2" label="All Cars" icon={<PostAddIcon />} />
                                                        </Link>

                                                        <Link to="/admin/car" className="nav-link">
                                                            <TreeItem nodeId="3" label="Create Car" icon={<AddIcon />} />
                                                        </Link>
                                                    </TreeItem>
                                                </TreeView>
                                            </li>
                                            <li className="nav-item" >
                                                <Link to="/admin/reservations" className="nav-link">Reservations</Link>
                                            </li>
                                            <li className="nav-item" >
                                                <Link to="/admin/users" className="nav-link"> Users</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </>
                            }


                        </ul>
                    </div>
                    <div className="collapse navbar-collapse" id="account">
                        <ul className="navbar-nav ml-auto">
                            {!isAuthenticated && <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signin">Signin</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">Signup</Link>
                                </li>
                            </>}
                        </ul>
                    </div>
                    {/* {isAuthenticated && */}
                        <ul className='navbar-nav ml-auto d-lg-flex d-none'>
                            <li className="nav-item mr-4">
                                <form className='' onSubmit={onSubmit}>
                                    <Search>
                                        <SearchIconWrapper>
                                            <SearchIcon />
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            placeholder="Search…"
                                            inputProps={{ 'aria-label': 'search' }}
                                            value={keyword}
                                            onChange={(e)=>{
                                                setKeyword(e.target.value);
                                            }}
                                        />
                                    </Search>
                                </form>
                            </li>
                            <li className="nav-item">
                                {isAuthenticated && <UserOptions user={user} />}
                            </li>
                        </ul>
                    {/* } */}
                </div>
            </nav>
        </>
    )
}

export default Header
import React, { useEffect, useState } from 'react';
import "./Dashboard.css";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Sidebar from './Sidebar';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, deleteUser, getAllUsers, updateUser } from '../../actions/userAction';
import { MenuItem, TextField } from '@mui/material';
import { useAlert } from "react-alert";
import "./CarList.css";
import Swal from "sweetalert2";  

function UserList() {

    const dispatch = useDispatch();
    const alert = useAlert();
    // const navigate = useNavigate();
    const [role, setRole] = useState("")
    const [updateUserId, setUpdateUserId] = useState("")
    const { error, users } = useSelector((state) => state.allUsers);


    const {
        error: deleteError,
        isDeleted,
        isUpdated
    } = useSelector((state) => state.profile);

    const deleteUserHandler = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgb(32, 168, 217)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete It'
        }).then(function (result) {
            if (result.isConfirmed) {
                dispatch(deleteUser(id));
            }
        });

    };

    const onHandleChangeRole = (e) => {
        e.stopPropagation()
        setRole(e.target.value);
    }

    const onSaveChanges = () => {
        dispatch(updateUser(updateUserId, { role }));
    }

    useEffect(() => {
        if (error) {
            alert.error("Some Error Occured");
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error("Some Error Occured");
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("User Deleted Successfully");
            // navigate("/admin/users");
            dispatch({ type: "DELETE_USER_RESET" });
        }

        if (isUpdated) {
            alert.success("User Updated Successfully");
            // navigate("/admin/users");
            dispatch({ type: "UPDATE_USER_RESET" });
        }

        dispatch(getAllUsers());
    }, [dispatch, error, isDeleted, deleteError, isUpdated, alert]);


    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

        {
            field: "name",
            headerName: "User Name",
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 150,
            flex: 1,
        },

        {
            field: "mobile",
            headerName: "User Mobile",
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 100,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin"
                    ? "greenColor"
                    : "rgba(0,0,0,0)";
            },
        },
        {
            field: "createdAt",
            headerName: "Created Date",
            minWidth: 150,
            flex: 0.5,
        },


        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "actions",
            sortable: false,
            // renderCell: (params) => {
            //     return (
            //         <>
            //             <Button data-toggle="modal" data-target="#editUserModal"
            //                 onClick={() =>
            //                     setUpdateUserId(params.getValue(params.id, "id"))
            //                 }
            //             >
            //                 <EditIcon style={{ color: "rgb(32,168,217)" }} />
            //             </Button>

            //             <Button
            //                 onClick={() =>
            //                     deleteUserHandler(params.getValue(params.id, "id"))
            //                 }
            //             >
            //                 <DeleteIcon />
            //             </Button>
            //         </>
            //     );
            // },
            getActions: (params) => [
                <GridActionsCellItem
                  icon={<EditIcon style={{ color: "rgb(32,168,217)" }} />}
                  label='Update'
                  onClick={() =>
                    setUpdateUserId(params.id)
                  }
                  data-toggle="modal" data-target="#editUserModal"
                />,
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label='Delete'
                  onClick={() =>
                    deleteUserHandler(params.id)
                  }
                />
              ]
            
        },
    ];

    const rows = [];

    users &&
        users.forEach((item) => {
            rows.push({
                id: item._id,
                role: item.role,
                email: item.email,
                name: item.username,
                mobile: item.mobile,
                createdAt: new Date(item.createdAt).toDateString(),
            });
        });

    return (
        <>
            <div className="dashboard">
                <Sidebar />

                <div className='right_side'>
                    <div className='container-fluid'>
                        <div className='p-3 dashboard_title mb-3'>
                            <h5 className='m-0 text-white'>All Users</h5>
                        </div>

                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            disableSelectionOnClick
                            className="mb-5 ListTable"
                            autoHeight
                        />

                    </div>
                </div>
            </div>

            <div className="modal fade" id="editUserModal" tabIndex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border_radius-12 body_bg_color">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editUserModalLabel">Update User Role</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <TextField
                                    id="role"
                                    name="role"
                                    select
                                    fullWidth
                                    label="Select Role"
                                    helperText="Please select User Role"
                                    value={role}
                                    onChange={onHandleChangeRole}
                                >
                                    {[{ value: "admin", label: "Admin" }, { value: "user", label: "User" }].map((option) => (
                                        <MenuItem key={option.value} value={option.value} className="d-block">
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary border_radius-12" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary common_btn" onClick={onSaveChanges} data-dismiss="modal">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserList
import React, { useEffect, useState } from 'react';
import "./Dashboard.css";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Sidebar from './Sidebar';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, deleteRentalCar, getAdminReservations, updateRentalStatus } from '../../actions/reservationAction';
import { useAlert } from "react-alert";
import "./CarList.css";
import Swal from "sweetalert2";  
import { MenuItem, TextField } from '@mui/material';
import moment from "moment";

function ReservationList() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { error, bookedCars } = useSelector((state) => state.allBookedCars);

    const { error: deleteError, isDeleted, isUpdated } = useSelector(
        (state) => state.rentalCar
    );

    const [updateStatus, setUpdateStatus] = useState("");
    const [updateStatusid, setUpdateStatusId] = useState("");

    const deleteBookedCarsHandler = (id) => {
        Swal.fire({  
            title: 'Are you sure?',  
            text: 'You want to delete this',  
            icon: 'warning',  
            showCancelButton: true,  
            confirmButtonColor: 'rgb(32, 168, 217)',  
            cancelButtonColor: '#d33',  
            confirmButtonText: 'Yes, Delete It'  
          }).then(function(result){
            if(result.isConfirmed){
                dispatch(deleteRentalCar(id));
            }
         });
    };

    const onHandleChangeStatus = (e) => {
        e.stopPropagation()
        setUpdateStatus(e.target.value);
    }
    
    const onSaveChanges = () => {
        dispatch(updateRentalStatus(updateStatusid, updateStatus));
    }

    useEffect(() => {
        if (error) {
            alert.error("Some Error Occuresd");
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error("Some Error Occured");
            dispatch(clearErrors());
        }

        if (isUpdated) {
            console.log(isUpdated);
            alert.success("Status Updated Successfully");
            dispatch(clearErrors());
            dispatch({ type: "UPDATE_RESERVATION_RESET" });

        }

        if (isDeleted) {
            alert.success("Rental Car Deleted Successfully");
            // navigate("/admin/reservations");
            dispatch({ type: "DELETE_RESERVATION_RESET" });
        }

        dispatch(getAdminReservations());
    }, [dispatch, error, isDeleted, alert, deleteError, isUpdated])


    const columns = [
        { field: "id", headerName: "Rental Car ID", minWidth: 200, flex: 0.5 },

        {
            field: "user",
            headerName: "User Id",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "car",
            headerName: "Car Name",
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: "dateOut",
            headerName: "Pick Up Date",
            minWidth: 200,
            flex: 0.5,
        },

        {
            field: "dateReturned",
            headerName: "Drop Off Date",
            minWidth: 200,
            flex: 0.3,
        },
        {
            field: "paymentStatus",
            headerName: "Payment Status",
            minWidth: 100,
            flex: 0.3,
        },
        {
            field: "rentalFee",
            headerName: "Rental Fee",
            type: "number",
            minWidth: 150,
            flex: 0.5,
        },

        {
            field: "qty",
            headerName: "Quantatiy",
            type: "number",
            minWidth: 100,
            flex: 0.3,
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 100,
            flex: 0.3,
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: 'actions',
            sortable: false,
            // renderCell: (params) => {
            //     return (
            //         <>
            //             <Button data-toggle="modal" data-target="#editStatusModal"
            //                 onClick={() =>
            //                     setUpdateStatusId(params.getValue(params.id, "id"))
            //                 }
            //             >
            //                 <EditIcon style={{ color: "rgb(32,168,217)" }} />
            //             </Button>

            //             <Button
            //                 onClick={() =>
            //                     deleteBookedCarsHandler(params.getValue(params.id, "id"))
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
                    setUpdateStatusId(params.id)
                  }
                  data-toggle="modal" data-target="#editStatusModal"
                />,
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label='Delete'
                  onClick={() =>
                    deleteBookedCarsHandler(params.id)
                  }
                />
              ]
        },
    ]

    const rows = [];

    bookedCars &&
        bookedCars.forEach((item) => {
            rows.push({
                id: item._id,
                user: item.user,
                car: item.car?.name ? item.car?.name : "Car Not Available" ,
                dateOut: moment(item.dateOut).format('DD-MM-YYYY h:mm a'),
                dateReturned: moment(item.dateReturned).format('DD-MM-YYYY h:mm a'),
                rentalFee: item.rentalFee,
                paymentStatus: item.paymentStatus,
                status: item.status,
                qty: item.qty,
            });
        });

    return (
        <>
            <div className="dashboard">
                <Sidebar />

                <div className='right_side'>
                    <div className='container-fluid'>
                        <div className='p-3 dashboard_title mb-3'>
                            <h5 className='m-0 text-white'>All Reservations</h5>
                        </div>

                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            disableSelectionOnClick
                            className="mb-5 ListTable"
                            autoHeight
                            initialState={{ pinnedColumns: { right: ['actions'] } }}
                        />
                    </div>
                </div>
            </div>

            <div className="modal fade" id="editStatusModal" tabIndex="-1" aria-labelledby="editStatusModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border_radius-12 body_bg_color">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editStatusModalLabel">Update User Role</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <TextField
                                    id="status"
                                    name="status"
                                    select
                                    fullWidth
                                    label="Update Status"
                                    helperText="Please Update Status"
                                    value={updateStatus}
                                    onChange={onHandleChangeStatus}
                                >
                                    {[{ value: "Confirmed", label: "Confirmed" }, { value: "Completed", label: "Completed" }].map((option) => (
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

export default ReservationList;
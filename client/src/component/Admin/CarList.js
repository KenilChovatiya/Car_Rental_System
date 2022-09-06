import React, { useEffect } from 'react';
import "./Dashboard.css";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
// import { DataGrid } from "@material-ui/data-grid";
import Sidebar from './Sidebar';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteCar, getAdminCars } from '../../actions/carAction';
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from "react-alert";
import { clearErrors } from '../../actions/userAction';
import "./CarList.css";
import Swal from "sweetalert2";

function CarList() {

  const dispatch = useDispatch();
  const alert = useAlert();
  // const navigate = useNavigate();

  const { error, cars } = useSelector((state) => state.cars);

  const { car, loading, error: cardetailsError } = useSelector(
    (state) => state.carDetails
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.car
  );

  const deleteCarHandler = (id) => {
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
        dispatch(deleteCar(id));
      }
    });
  };

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
      alert.success("Car Deleted Successfully");
      // navigate("/admin/dashboard");
      dispatch({ type: "DELETE_CAR_RESET" });
    }

    dispatch(getAdminCars());

  }, [dispatch, error, isDeleted, alert])

  const columns = [
    { field: "id", headerName: "Car ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "brand",
      headerName: "Brand",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "type",
      headerName: "Type",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "dailyRentalRate",
      headerName: "Daily Rate (₹)",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "numOfSeats",
      headerName: "Total Seats",
      type: "number",
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
      //   return (
      //     <>
      //       <Link to={`/admin/car/${params.getValue(params.id, "id")}`}>
      //         <EditIcon style={{ color: "rgb(32,168,217)" }} />
      //       </Link>

      //       <Button
      //         onClick={() =>
      //           deleteCarHandler(params.getValue(params.id, "id"))
      //         }
      //       >
      //         <DeleteIcon />
      //       </Button>
      //     </>
      //   );
      // },
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon style={{ color: "rgb(32,168,217)" }} />}
          label='Edit'
          component={Link}
          to={`/admin/car/${params.id}`}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label='Delete'
          onClick={() =>
            deleteCarHandler(params.id)
          }
        />
      ]
    },
  ]

  const rows = [];

  cars &&
    cars.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.numInStock,
        dailyRentalRate: item.dailyRentalRate,
        name: item.name,
        type: item.type,
        brand: item.brand,
        numOfSeats: item.numOfSeats,
      });
    });

  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className='right_side'>
          <div className='container-fluid'>
            <div className='p-3 dashboard_title mb-3'>
              <h5 className='m-0 text-white'>All Cars</h5>
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
    </>
  )
}

export default CarList;
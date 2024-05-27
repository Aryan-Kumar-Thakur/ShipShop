import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./myOrders.css"
import { useSelector , useDispatch } from 'react-redux';
import { clearErrors , myOrders } from '../../actions/orderActions';
import Loader from '../layout/loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { types, useAlert } from 'react-alert';
import { Typography } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import LaunchIcon from '@mui/icons-material/Launch';

const MyOrders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const {loading,error,orders} = useSelector((state)=>state.myOrders)
    const {user} = useSelector((state)=>state.user)

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(myOrders())
    },[dispatch,alert,error])

    const columns = [
        {field: "id",headerName: "Order ID", minWidth: 300 , flex: 1},
        {field: "status",headerName: "Status",minWidth: 150 , flex: 0.3,
         cellClassName: (params)=>{
            return params.value === "Delivered" ? "greenColor":"redColor";
        }},
        {field: "itemsQty",headerName: "items Qty", type: "number",minWidth: 150 , flex: 0.3},
        {field: "amount",headerName: "Amount", type: "number",minWidth: 270 , flex: 0.5},
        {fiels: "actions",headerName: "Actions", flex: 0.3,minWidth: 150 , type: "number", sortable : false,
            renderCell: (params)=>{
                return (
                    <>
                    <Link to={`/order/${params.id}`} ><LaunchIcon/></Link>
                    </>
                )
            }
        }
    ];
    const rows = [];

    orders && 
    orders.forEach((item,index) => {
        rows.push({
            key: index,
            itemsQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice
        })
    });

  return (
    <>
    <MetaData title={`${user.name} - Orders`}></MetaData>

    {loading ? <Loader/> :
    <>
        <div className="myOrdersPage">
            <DataGrid rows={rows} columns={columns} pageSizeOptions={10} disableRowSelectionOnClick
                className='myOrdersTable' autoHeight
            />
            <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
    </>
    }
    </>
  )
}

export default MyOrders

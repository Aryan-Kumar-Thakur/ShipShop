import React, { useEffect } from "react";
import { DataGrid, renderActionsCell } from '@mui/x-data-grid';
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders, deleteOrder, clearErrors } from "../../actions/orderActions";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from "./Sidebar";
import { DELETE_ORDER_RESET } from "../../slice/orderSlice";

const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()

  const { error, orders } = useSelector((state) => state.allOrder)

  console.log(orders)

  const { error: deleteError, isDeleted } = useSelector((state) => state.order)

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  }


  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Order Deleted Successfully")
      navigate("/admin/orders")
      dispatch(DELETE_ORDER_RESET())
    }

    dispatch(getAllOrders())
  }, [error, dispatch, alert, deleteError, isDeleted, navigate])


  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status", headerName: "Status", minWidth: 150, flex: 0.3,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      }
    },
    { field: "itemsQty", headerName: "items Qty", type: "number", minWidth: 150, flex: 0.3 },
    { field: "amount", headerName: "Amount", type: "number", minWidth: 270, flex: 0.5 },
    {
      field: "actions", headerName: "Actions", type: Number, minWidth: 150, flex: 0.3, sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/orders/${params.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={()=>deleteOrderHandler(params.id)}><DeleteIcon /></Button>
          </>
        )
      }
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        key: index,
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice
      })
    })
  return (
    <>
      <MetaData title={"ALL PRODUCTS --Admin"} />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 className="productListHeading">ALL ORDERS</h1>

          <DataGrid rows={rows} columns={columns} pageSizeOptions={[10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            disableRowSelectionOnClick
            className="productListTable" autoHeight />
        </div>
      </div>
    </>
  )
}

export default OrderList
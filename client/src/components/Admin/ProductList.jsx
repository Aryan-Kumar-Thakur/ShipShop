import React, { useEffect } from "react";
import { DataGrid, renderActionsCell } from '@mui/x-data-grid';
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAdminProducts, deleteProduct } from "../../actions/productActions";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../slice/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()

  const {error, products} = useSelector((state) => state.adminProducts)

  const {error:deleteError , isDeleted} = useSelector((state)=>state.product)

  const deleteProductHandler = (id)=>{
    dispatch(deleteProduct(id));
  }


  useEffect(()=>{
    if(error){
      alert.error(error)
      dispatch(clearErrors());
    }
    if(deleteError){
      alert.error(deleteError)
      dispatch(clearErrors());
    }
    if(isDeleted){
      alert.success("Product Deleted Successfully")
      navigate("/admin/products")
      dispatch(DELETE_PRODUCT_RESET())
    }

    dispatch(getAdminProducts())
  },[error,dispatch, alert, deleteError, isDeleted, navigate])

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
    { field: "stock", headerName: "Stock", type: Number, minWidth: 150, flex: 0.3 },
    { field: "price", headerName: "Price", type: Number, minWidth: 270, flex: 0.5 },
    {
      field: "actions", headerName: "Actions", type: Number, minWidth: 150, flex: 0.3, sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/product/${params.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={()=>deleteProductHandler(params.id)}><DeleteIcon /></Button>
          </>
        )
      }
    },
  ]

  const rows = [];

  products &&
    products.forEach((item, index) => {
      rows.push({
        key: index,
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name
      })
    })
  return (
    <>
      <MetaData title={"ALL PRODUCTS --Admin"} />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 className="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList
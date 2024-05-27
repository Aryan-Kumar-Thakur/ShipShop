import React from 'react'
import "./sidebar.css"
import { Link } from 'react-router-dom'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <Link to="/"><h1>ShipShop</h1></Link>
        <Link to="/admin/dashboard"><DashboardIcon /> Dashboard</Link>
        <Link>
          <SimpleTreeView>
            <TreeItem itemId="1" label="Products">
              <Link to="/admin/products">
                <TreeItem itemId="2" label="All" icon={<PostAddIcon />}></TreeItem>
              </Link>
              <Link to="/admin/product">
                <TreeItem itemId="3" label="Create" icon={<AddIcon />}></TreeItem>
              </Link>
            </TreeItem>
          </SimpleTreeView>
        </Link>
        <Link to="/admin/orders">
          <p><ListAltIcon /> Orders</p>
        </Link>
        <Link to="/admin/users">
          <p><PeopleIcon /> Users</p>
        </Link>
        <Link to="/admin/reviews">
          <p><RateReviewIcon /> Reviews</p>
        </Link>
      </div>
    </>
  )
}

export default Sidebar
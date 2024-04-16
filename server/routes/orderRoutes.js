import express from 'express'
import isAuthenticated , { authorizeRole }from '../middleware/auth.js'
import { deleteOrders, getAllOrders, getMyOrders, getSingleOrder, newOrder, updateOrder } from '../controllers/orderController.js';

const router = express.Router();

router.route("/order/new").post(isAuthenticated , newOrder)
router.route("/order/:id").get(isAuthenticated  , getSingleOrder)
router.route("/order/get/my").get(isAuthenticated , getMyOrders)
router.route("/admin/orders").get(isAuthenticated , authorizeRole("admin") , getAllOrders)
router.route("/admin/orders/:id").put(isAuthenticated , authorizeRole("admin") , updateOrder)
.delete(isAuthenticated , authorizeRole("admin") , deleteOrders)

export default router
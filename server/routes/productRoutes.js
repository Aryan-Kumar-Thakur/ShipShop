import express from 'express'
import getAllproducts, { createProduct, createProductReview, deleteProduct, deleteProductReview, getAdminproducts, getAllProductReview, getSingleProduct, updateProduct } from '../controllers/productControllers.js'
import isAuthenticated , { authorizeRole }from '../middleware/auth.js'

const router = express.Router()

router.route("/admin/product/new").post(isAuthenticated , authorizeRole("admin") , createProduct)
router.route("/products").get(getAllproducts)
router.route("/admin/products").get(isAuthenticated , authorizeRole("admin") , getAdminproducts)
router.route("/admin/products/:id").put(isAuthenticated , authorizeRole("admin") , updateProduct).delete(isAuthenticated , authorizeRole("admin") , deleteProduct)
router.route("/product/:id").get(getSingleProduct)
router.route("/review").put(isAuthenticated , createProductReview)
router.route("/review").get(getAllProductReview).delete(isAuthenticated,deleteProductReview)

export default router
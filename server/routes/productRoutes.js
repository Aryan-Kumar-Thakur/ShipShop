import express from 'express'
import getAllproduct, { createProduct, createProductReview, deleteProduct, deleteProductReview, getAllProductReview, getSingleProduct, updateProduct } from '../controllers/productControllers.js'
import isAuthenticated , { authorizeRole }from '../middleware/auth.js'

const router = express.Router()

router.route("/admin/product/new").post(isAuthenticated , authorizeRole("admin") , createProduct)
router.route("/products").get(getAllproduct)
router.route("/admin/products/:id").put(isAuthenticated , authorizeRole("admin") , updateProduct).delete(isAuthenticated , authorizeRole("admin") , deleteProduct)
router.route("/product/:id").get(getSingleProduct)
router.route("/review").put(isAuthenticated , createProductReview)
router.route("/review").get(getAllProductReview).delete(isAuthenticated,deleteProductReview)

export default router
import express from "express";
import registerUser, { deleteUser, forgotPassword, getAllUser, getSingleUser, getUserDetails, loginUser, logoutUser, resetPassword, updatePassword, updateProfile, updateUserRole } from "../controllers/userController.js";
import isAuthenticated , {authorizeRole} from "../middleware/auth.js"

const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/me").get(isAuthenticated , getUserDetails)
router.route("/password/update").put(isAuthenticated , updatePassword)
router.route("/me/update").put(isAuthenticated , updateProfile)
router.route("/admin/user").get(isAuthenticated , authorizeRole("admin") , getAllUser)
router.route("/admin/user/:id").get(isAuthenticated , authorizeRole("admin") , getSingleUser)
.put(isAuthenticated , authorizeRole("admin") , updateUserRole)
.delete(isAuthenticated , authorizeRole("admin") , deleteUser)
router.route("/logout").get(logoutUser)

export default router
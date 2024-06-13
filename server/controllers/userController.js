import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import sendToken from "../utils/jwttoken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto'
import cloudinary from "cloudinary"

//Register a user

const registerUser = catchAsyncError(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale"
    })
    const { name, email, password } = req.body

    const newUser = await User.create({
        name, email, password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    })

    sendToken(newUser, 201, res)
})

// login user
const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorHandler("Please enter valid email and password", 400))
    }

    const newUser = await User.findOne({ email }).select("+password")

    if (!newUser) {
        return next(new ErrorHandler("Invalid Credentials", 401))
    }
    const isMatched = await newUser.comparePassword(password)
    if (!isMatched) {
        return next(new ErrorHandler("Invalid Credentials", 401))
    }

    sendToken(newUser, 200, res)
})

//logout user

const logoutUser = catchAsyncError(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "logout successfully"
    })
})


//forgot password

const forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new ErrorHandler("user not found", 404))
    }

    //get reset password token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you are not requested this email then, please ignore it `;

    try {

        await sendEmail({
            email: user.email,
            subject: "ShipShop Password Recovery",
            message,
        })

        res.status(200).json({
            success: true,
            message: `Email send to ${user.email} successfully`
        })

    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(err.message, 500));
    }
})

// Reset Password
const resetPassword = catchAsyncError(async (req, res, next) => {

    //creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    })

    if (!user) {
        return next(new ErrorHandler("Reset Password Token is Invalid or Has Been Expired", 400))
    }


    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password and Confirm Password does not matched", 400))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined
    await user.save();
    sendToken(user, 200, res)

})

//Get User Details

const getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password")


    res.status(200).json({
        success: true,
        user
    })
})

// Update User Password

const updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password")

    const isMatched = await user.comparePassword(req.body.oldPassword)

    if (!isMatched) {
        return next(new ErrorHandler("Old Password is Incorrect", 400))
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password and Confirm Password does not match", 400))
    }

    user.password = req.body.newPassword

    await user.save()

    sendToken(user, 200, res)
})

// Update User Profile

const updateProfile = catchAsyncError(async (req, res, next) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
    }

    //we will add cloudnary here

    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id)

        const imageId = user.avatar.public_id

        await cloudinary.v2.uploader.destroy(imageId);

    }

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale"
    })

    newUser.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUser, {
        new: true,
        validator: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

// Get all users for admin

const getAllUser = catchAsyncError(async (req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        success: true,
        users
    })
})

// get single user for admin

const getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`User Not Found with id ${req.parems.id}`, 400))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Update User Profile by Admin

const updateUserRole = catchAsyncError(async (req, res, next) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    //we will add cloudnary later

    const user = await User.findByIdAndUpdate(req.params.id, newUser, {
        new: true,
        validator: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

//Delete user by admin

const deleteUser = (catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`User Not Found with id ${req.parems.id}`, 400))
    }

    //we will remove cloudnary later

    await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully"
    })
}))



export default registerUser
export { loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getSingleUser, getAllUser, updateUserRole, deleteUser }
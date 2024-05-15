import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./resetPassword.css"
import Loader from '../layout/loader/Loader'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearErrors, loadUser } from '../../actions/userActions';
import { useAlert } from "react-alert";
import MetaData from '../layout/MetaData';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

export const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()


    const { error, success, loading } = useSelector(
        (state) => state.forgotPassword
    )

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { token } = useParams();

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(token, myForm))
    }


    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            alert.success("Password Updated Successfully")
            navigate("/login")
        }
    }, [error, dispatch, alert, navigate, success])

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title="Change Password" />
                    <div className="resetPasswordContainer">
                        <div className="resetPasswordBox">
                            <h2 className='resetPasswordHeading'>reset Password</h2>
                            <form className='resetPasswordForm'
                                onSubmit={resetPasswordSubmit}>
                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input type="password" placeholder="New Password" required value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <LockIcon />
                                    <input type="password" placeholder="Confirm Password" required value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input type="submit" value="Update" className='resetPasswordBtn' disabled={loading ? true : false} />
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ResetPassword

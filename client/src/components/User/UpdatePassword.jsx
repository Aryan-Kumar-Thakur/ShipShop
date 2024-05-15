import React, { useEffect, useRef, useState } from 'react'
import "./updatePassword.css"
import Loader from '../layout/loader/Loader'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, clearErrors, loadUser } from '../../actions/userActions';
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from '../../slice/userSlice';
import MetaData from '../layout/MetaData';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()


    const { error, isUpdated, loading } = useSelector(
        (state) => state.profile
    )

    console.log(isUpdated);

    const [oldpassword, setOldPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldpassword);
        myForm.set("newPassword", newpassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm))
    }


    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success("Password Updated Successfully")
            navigate("/account")
            dispatch(UPDATE_PASSWORD_RESET());
        }
    }, [error, dispatch, alert, navigate, isUpdated])

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title="Change Password" />
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className='updatePasswordHeading'>Update Password</h2>
                            <form className='updatePasswordForm'
                                onSubmit={updatePasswordSubmit}>
                                <div className="loginPassword">
                                    <VpnKeyIcon />
                                    <input type="password" placeholder="Old Password" required value={oldpassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input type="password" placeholder="New Password" required value={newpassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <LockIcon />
                                    <input type="password" placeholder="Confirm Password" required value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input type="submit" value="Change" className='updatePasswordBtn' disabled={loading ? true : false} />
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default UpdatePassword
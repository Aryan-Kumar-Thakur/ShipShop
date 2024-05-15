import React, { useEffect, useRef, useState } from 'react'
import "./updateProfile.css"
import Loader from '../layout/loader/Loader'
import {  useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, clearErrors, loadUser } from '../../actions/userActions';
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from '../../slice/userSlice';
import MetaData from '../layout/MetaData';

const UpdateProfile = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()

    const { user } = useSelector(
        (state) => state.user
    )

    const { error, isUpdated, loading } = useSelector(
        (state) => state.profile
    )

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState()
    const [avatarPreview, setAvatarPreview] = useState("")

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm))
    }


    const updateProfileDataChange = (e) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    useEffect(() => {

        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success("Profile Updated Successfully")
            dispatch(loadUser());
            navigate("/account")
            dispatch(UPDATE_PROFILE_RESET());
        }
    }, [error, dispatch, alert, navigate, user, isUpdated])

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title="Update Profile" />
                    <div className="updateProfileContainer">
                        <div className="updateProfileBox">
                            <h2 className='updateProfileHeading'>Update Profile</h2>
                            <form className='updateProfileForm' encType='multipart/form-data'
                                onSubmit={updateProfileSubmit}>
                                <div className="updateProfileName">
                                    <AccountCircleIcon />
                                    <input type="text" placeholder="Name" name='name' required value={name}
                                        onChange={(e)=>setName(e.target.value)}
                                    />
                                </div>
                                <div className="updateProfileEmail">
                                    <MailOutlineIcon />
                                    <input type="email" placeholder="Email" name='email' required value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </div>
                                <div id="updateProfileImage">
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input type="file" name='avatar' accept='image/*'
                                        onChange={updateProfileDataChange} />
                                </div>
                                <input type="submit" value="Update" className='updateProfileBtn' disabled={loading ? true : false} />
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default UpdateProfile
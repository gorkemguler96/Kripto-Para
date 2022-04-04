import React, {useState} from 'react';
import {Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {accountProfile, checkProfile} from '../../../Redux/coinSlice'


function ProfileBtn(props) {

    const profileCheck = useSelector((state)=>state.coin.checkProfile)
    const dispatch = useDispatch()

    const handleClickProfile = () => {
        dispatch(checkProfile(!profileCheck))
    }

    return (
        <div>
            <Button onClick={handleClickProfile} size={"large"} type="primary">Profile </Button>
        </div>
    );
}

export default ProfileBtn;

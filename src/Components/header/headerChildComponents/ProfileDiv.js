import {Button, Modal} from 'antd'
import { SettingOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {accountProfileOnly, checkProfile, changeDarkMode, moneySell, zeroCoinAmount,logOutPage} from "../../../Redux/coinSlice";
import React, { useState } from 'react';

function ProfileDiv({setBasket}) {

    const profileName = useSelector((state)=>state.coin.accountProfile)
    const checkProfiles = useSelector((state)=>state.coin.checkProfile)
    const totalMoney = useSelector((state)=>state.coin.money.toLocaleString("en-US"))
    const totalMoneys = useSelector((state)=>state.coin.money)
    const darkMode = useSelector((state)=>state.coin.darkMode)
    const dispatch = useDispatch()

    const logOutClick = ()=> {
        dispatch(accountProfileOnly(false))
        dispatch(checkProfile(!checkProfiles))
        setIsModalVisible(false);
        dispatch(moneySell(100000-totalMoneys))
        dispatch(zeroCoinAmount(0))
        setBasket([])
        dispatch(logOutPage(1))
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        dispatch(checkProfile(false))
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        dispatch(checkProfile(false))

    };

    const darkOnly = () => {
        dispatch(changeDarkMode(true))
    }

    const lightOnly = () => {
        dispatch(changeDarkMode(false))
    }

    return (
        <div className={"profileDiv"}>
            <Button type="text">{profileName}</Button>
            <div className={"ucluButton"} style={{display:"flex"}}>
                <Button type="text">Total: {totalMoney}</Button>
                <SettingOutlined  onClick={showModal} />
                <Modal    className={"modalProfile"} title="Settings" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <h4>Theme</h4>
                    <span className={"modalButtons"}>
                        <Button onClick={darkOnly} className={"dark"} type="text">Dark</Button>
                        <Button onClick={lightOnly} className={"light"} type="text">Light</Button>
                    </span>
                </Modal>
                <Button onClick={logOutClick} type="text">Log Out</Button>
            </div>
        </div>
    );
}

export default ProfileDiv;

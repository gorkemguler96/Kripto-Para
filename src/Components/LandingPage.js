import React from 'react';
import LandingPageCss from '../style/LandingPage.css'
import {  LinkedinOutlined, GithubOutlined} from '@ant-design/icons';
import { Input } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {accountProfile, accountProfileOnly} from '../Redux/coinSlice'


function LandingPage(props) {

    const darkMode = useSelector((state)=>state.coin.darkMode)
    const dispatch = useDispatch();
    const { Search } = Input;
    const onSearch = (value) =>{
        dispatch(accountProfile([value]));
        dispatch(accountProfileOnly(true))
    }


    return (
        <div className={"landingPage"}>
            <h1 style={darkMode ? {color:"white"} : null}>Welcome 👋 Let's create your account!</h1>
            <Search
                className={"inputS"}
                placeholder="@Username"
                allowClear
                enterButton="Add"
                size="large"
                onSearch={onSearch}
            />
            <div className={"contactInformation"}>
                <p style={darkMode ? {color:"rgb(255,255,255,0.5)"} : null}>Developed by /gorkemGuler</p>
                <a href="https://github.com/slx1996"><GithubOutlined/></a>
                <a href="https://www.linkedin.com/in/g%C3%B6rkem-g%C3%BCler-ab3a951b0/"><LinkedinOutlined /></a>
            </div>
        </div>
    );
}

export default LandingPage;

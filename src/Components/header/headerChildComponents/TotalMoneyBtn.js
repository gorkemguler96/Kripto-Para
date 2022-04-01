import React from 'react';
import {Button} from "antd";
import {useSelector} from "react-redux";

function TotalMoneyBtn(props) {

    const stateMoney = useSelector((state)=>state.coin.money).toLocaleString('en-US')

    return (
        <div className={"totalMoneyBtn"}>
            <Button size={"large"} type="primary">USD {stateMoney} </Button>
        </div>
    );
}

export default TotalMoneyBtn;

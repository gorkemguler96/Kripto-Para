import React, { useState } from 'react';
import {Button, Card} from "antd";
import { Input, Modal } from 'antd';
import headerCss from '../style/Header.css'
import {useSelector} from "react-redux";
import {FundOutlined} from "@ant-design/icons";

function Header({basket, setBasket}) {

    const { Search } = Input;
    const onSearch = value => console.log(value);
    const basketCoins = useSelector((state)=>state.coin.addCoins)
    const coinsAmount = useSelector((state)=>state.coin.addCoinsAmount)
    const money = useSelector((state)=>state.coin.money).toLocaleString('en-US')

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleClick = (x) => {

    }

    const basketObj = basket.map((x)=>x)
    console.log(basketObj)

    return (
        <div className={"fullHeader"}>
            <div className={"Header"}>
                <h1>crypto</h1>
                <div className={"HeaderButton"}>
                    <Button size={"large"} type="primary">Profile </Button>
                    <Button size={"large"} type="primary" onClick={showModal}>
                        Wallet
                        <span className={"badge"}>
                            {coinsAmount}
                        </span>
                    </Button>
                    <Modal className={"modal"} title="Wallet" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        {basket.map((x)=>(
                            <Card key={x.total_volume} className={"modalCard"}  bordered={true} style={{ width: 350 ,height:200 }}>
                                <div style={{display:"flex"}}>
                                    <img src={x?.image} alt=""/>
                                    <h2>{x.current_price} $</h2>
                                </div>
                                <Button className={"oranModalButton"} size={"large"} >{x.market_cap_change_percentage_24h}</Button>
                                <div className={"flexBasketButton"}>
                                    <Button size={"large"} type="danger">Sell</Button>
                                    <Button size={"large"} className={"amountModal"}><h4>x{x?.amount}</h4></Button>
                                    <Button size={"large"} onClick={()=> handleClick(x)}   type="primary">Buy</Button>
                                </div>
                            </Card>
                        ))}
                    </Modal>
                    <Button size={"large"} type="primary">
                        <FundOutlined style={{fontSize:20}}/>
                        <span className={"badge"}>
                            100.000
                        </span>
                    </Button>
                    <Button size={"large"} type="primary">USD {money} </Button>
                </div>
                <Search
                    className={"Search"}
                    placeholder="Coin Name"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                />
            </div>
            <div className={"headerBottomColor"}></div>
        </div>
    );
}

export default Header;

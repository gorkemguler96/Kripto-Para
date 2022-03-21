import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Button} from "antd";
import {default as axios} from "axios";
import coinsCSS from '../style/Coins.css'




function CardItems() {

    const { Meta } = Card;

    const [coins,setCoins] = useState([])

    useEffect(()=> {
        const fetchCoins = async () => {
            await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=76&page=1&sparkline=false`).then((response)=>{
                response.json().then((json)=> {
                    setCoins(json)
                })
            })
        }
        fetchCoins()
    },[])

    useEffect(()=> {
        const fetchCoins = async () => {
            await fetch(`https://api.coingecko.com/api/v3/coins`).then((response)=>{
                response.json().then((json)=> {
                    console.log(json)
                })
            })
        }
        fetchCoins()
    },[])
    console.log(coins)

    return (
        <div className={"Coins"}>
            <Row gutter={[32,32]}>
                {coins?.map((x)=>(
                    <Col key={x.id} className="gutter-row" span={6}>
                        <div className="site-card-border-less-wrapper">
                            <Card title={x?.id.toUpperCase()} bordered={true} style={{ width: 250 ,height:400 }}>
                                <img src={x?.image} alt=""/>
                                <h1>{x.current_price} $</h1>
                                <div className={"flexCardBtn"}>
                                    <Button size={"large"} type="danger">Sell</Button>
                                    <Button size={"large"} style={{background: "rgb(21,115,71)"}} type="primary">Buy</Button>
                                </div>
                            </Card>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default CardItems;

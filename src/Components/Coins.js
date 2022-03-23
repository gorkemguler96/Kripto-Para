import React, {useEffect, useState} from 'react';
import CardItems from "./CardItems";
import {default as axios} from "axios";
import {Card, Col, Row, Button } from "antd";
import coinsCSS from '../style/Coins.css'
import {fetchCoins, money, addToCoins, moneySell, coinAmount} from '../Redux/coinSlice'
import {useDispatch, useSelector} from "react-redux";


function Coins({amountluItem,setAmountluItem,items, basket, setBasket }) {

    const { Meta } = Card;
    const dispatch = useDispatch();
    const coinsItem = useSelector((state)=>state.coin.items)
    const basketCoins = useSelector((state)=>state.coin.addCoins)
    const coinsAmount = useSelector((state)=>state.coin.addCoinsAmount)
    const totalMoney = useSelector((state)=>state.coin.money)


    const handleClickBuy = (x) => {
        if(totalMoney>x.current_price){
            const checkBasketCoins = basket.filter((items)=>items.id === x.id).length === 0
            if(checkBasketCoins ){
                setBasket([...basket,x])
                dispatch(money(x.current_price))
                dispatch(coinAmount(1))
            }else{
                setBasket([...basket],x.amount++)
                dispatch(coinAmount(1))
                dispatch(money(x.current_price))
            }
        }
    }

    const handleClickSell = (x) => {
        dispatch(moneySell(x.current_price))
    }

    const olLutfen = [...amountluItem.map(x=>x[0])]

    return (
        <div className={"Coins"}>
            <div className={"Coins"}>
                <Row gutter={[32,32]}>
                    {olLutfen?.map((x)=>(
                        <Col key={x.id} className="gutter-row" span={6}>
                            <div className="site-card-border-less-wrapper">
                                <Card title={x?.id.toUpperCase()} bordered={true} style={{ width: 250 ,height:400 }}>
                                    <img src={x?.image} alt=""/>
                                    <h1>{x.current_price} $</h1>
                                    <div className={"flexCardBtn"}>
                                        <Button onClick={()=>handleClickSell(x)} size={"large"} type="danger">Sell</Button>
                                        <Button size={"large"} >{x.market_cap_change_percentage_24h}</Button>
                                        <Button disabled={totalMoney<x.current_price} onClick={()=> handleClickBuy(x)} size={"large"}  type="primary">Buy</Button>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default Coins;

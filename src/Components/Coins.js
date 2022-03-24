import React, {useEffect, useState} from 'react';
import CardItems from "./CardItems";
import {default as axios} from "axios";
import {Card, Col, Row, Button } from "antd";
import coinsCSS from '../style/Coins.css'
import {fetchCoins, money, addToCoins, moneySell, coinAmount} from '../Redux/coinSlice'
import {useDispatch, useSelector} from "react-redux";


function Coins({amountluItem,setAmountluItem,items, basket, setBasket, totalCoinPrice, setTotalCoinPrice }) {

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
                setBasket([...basket,x],x.amount =1)
                dispatch(money(x.current_price))
                dispatch(coinAmount(1))
            }else{
                setBasket([...basket],x.amount++)
                dispatch(coinAmount(1))
                dispatch(money(x.current_price))
            }
        }
    }
    // console.log(totalCoinPrice.reduce((acc,item)=>acc + item,0))

    const handleClickSell = (x) => {
        const checkItem = basket.map(x=>x.id)
        if(x.amount >1){
            dispatch(coinAmount(-1))
            setBasket([...basket],x.amount--)
            dispatch(moneySell(x.current_price))
            const reduceCoin = totalCoinPrice.reduce((acc,item)=>acc + item,0)
        }else if(x.amount ===1) {
            dispatch(coinAmount(-1))
            const removeItem = basket.filter((item)=>item.id !== x.id)
            dispatch(moneySell(x.current_price))
            setBasket([...removeItem],x.amount--)
            const reduceCoin = totalCoinPrice.reduce((acc,item)=>acc + item,0)
        }
    }

    const olLutfen = [...amountluItem.map(x=>x[0])]

    return (
        <div className={"Coins"}>
            <div className={"Coins"}>
                <Row gutter={[32,32]}>
                    {[...amountluItem.map(x=>x[0])].map((x)=>(
                        <Col key={x.id} className="gutter-row" span={6}>
                            <div className="site-card-border-less-wrapper">
                                <Card title={x?.id.toUpperCase()} bordered={true} style={{ width: 250 ,height:400 }}>
                                    <img src={x?.image} alt=""/>
                                    <h1>{x.current_price} $</h1>
                                    <div>
                                        {(x.amount === 0) ?
                                            <div className={"amountsuzCard"}>
                                                <Button className={(x.market_cap_change_percentage_24h > 0) ? "artiPoint" : "eksiPoint"} size={"large"} >{x.market_cap_change_percentage_24h}</Button>
                                                <Button disabled={totalMoney<x.current_price} onClick={()=> handleClickBuy(x)} size={"large"}  type="primary">Buy</Button>
                                            </div>
                                            :
                                            <div className={"amountluCard"}>
                                                <Button onClick={()=>handleClickSell(x)} size={"large"} type="danger">Sell</Button>
                                                <Button className={(x.market_cap_change_percentage_24h > 0) ? "artiPoint" : "eksiPoint"} size={"large"} >{x.market_cap_change_percentage_24h}</Button>
                                                <Button disabled={totalMoney<x.current_price} onClick={()=> handleClickBuy(x)} size={"large"}  type="primary">Buy</Button>
                                            </div>
                                        }


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

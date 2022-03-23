import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Button } from "antd";
import coinsCSS from '../style/Coins.css'
import {fetchCoins, money, addToCoins, moneySell, coinAmount} from '../Redux/coinSlice'
import {useDispatch, useSelector} from "react-redux";




function CardItems() {

    const { Meta } = Card;
    const dispatch = useDispatch();
    const coinsItem = useSelector((state)=>state.coin.items)
    const basketCoins = useSelector((state)=>state.coin.addCoins)
    const coinsAmount = useSelector((state)=>state.coin.addCoinsAmount)
    const totalMoney = useSelector((state)=>state.coin.money)

    useEffect(()=>{
        dispatch(fetchCoins())
    },[])

    // useEffect(()=> {
    //     const fetchCoins = async () => {
    //         await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`).then((response)=>{
    //             response.json().then((json)=> {
    //                 setCoins(json)
    //             })
    //         })
    //     }
    //     fetchCoins()
    // },[])


    const handleClickBuy = (x) => {
        console.log(basketCoins.filter((y)=>y.id===x.id).length+1)
        if(totalMoney>x.current_price){
            const checkBasketCoins = basketCoins.filter((items)=>items.id === x.id).length < 0
            if(checkBasketCoins ){
                dispatch(addToCoins([...basketCoins, x]))
                dispatch(money(x.current_price))
            }else{
                dispatch(addToCoins([...basketCoins, basketCoins.filter((z)=>z.id === x.id).length+1]))
                dispatch(money(x.current_price))
            }
        }
    }
    useEffect(()=>{
        console.log(basketCoins)
    },[])

    const handleClickSell = (x) => {
        dispatch(moneySell(x.current_price))
    }


    return (
        <div className={"Coins"}>
            <Row gutter={[32,32]}>
                {coinsItem?.map((x)=>(
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
    );
}

export default CardItems;

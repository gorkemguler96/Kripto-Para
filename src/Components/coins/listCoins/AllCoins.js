import React from 'react';
import {Card, Col, Row, Button } from "antd";
import coinsCSS from '../../../style/Coins.css'
import {nextPage, money, moneySell, coinAmount} from '../../../Redux/coinSlice'
import {useDispatch, useSelector} from "react-redux";


function AllCoins({ amountluItem, basket, setBasket }) {

    const { Meta } = Card;
    const dispatch = useDispatch();
    const totalMoney = useSelector((state)=>state.coin.money)
    const darkMode = useSelector((state)=>state.coin.darkMode)
    const page = useSelector((state)=>state.coin.page)


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

    const handleClickSell = (x) => {
        if(x.amount >1){
            dispatch(coinAmount(-1))
            setBasket([...basket],x.amount--)
            dispatch(moneySell(x.current_price))
        }else if(x.amount ===1) {
            dispatch(coinAmount(-1))
            const removeItem = basket.filter((item)=>item.id !== x.id)
            dispatch(moneySell(x.current_price))
            setBasket([...removeItem],x.amount--)
        }
    }

    const handleClickNextPage = () => {
        dispatch(nextPage())
    }

    return (
        <div className={"Coins"}>
            <div className={"Coins"}>
                <Row gutter={[32,32]}>
                    {[...amountluItem.map(x=>x[0])].map((x)=>(
                        <Col key={x.id} className="gutter-row" span={6}>
                            <div className="site-card-border-less-wrapper">
                                <Card headStyle={darkMode ?{background:"#1C1F23" }:null}  bodyStyle={darkMode?{background:"#1C1F23"}: {background:"white"}} title={x?.id.toUpperCase()} bordered={true} style={{ width: 250 ,height:400 }}>
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
                <div className={"nextPage"}>
                    <Button onClick={()=>handleClickNextPage()} disabled={page >= 5} className={"nextPageBtn"} type="primary">{page >=5 ? "All coins listed" :`Next Page(${page})` }</Button>
                </div>
            </div>
        </div>
    );
}

export default AllCoins;

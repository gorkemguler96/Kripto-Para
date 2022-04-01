import React, {useState} from 'react';
import {Button, Card, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {CloseOutlined} from "@ant-design/icons";
import {coinAmount, money, moneySell, zeroCoinAmount} from "../../../Redux/coinSlice";


function WalletBtn({basket,setBasket}) {

    const coinsAmount = useSelector((state)=>state.coin.addCoinsAmount)
    const stateMoney = useSelector((state)=>state.coin.money).toLocaleString('en-US')
    const totalMoney = useSelector((state)=>state.coin.money)
    const dispatch = useDispatch()

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
        dispatch(moneySell(100000-totalMoney))
        dispatch(zeroCoinAmount(0))
        setBasket([])
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

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

    const removeItem = (x) => {
        const selectedCardDelete = basket.filter((z)=>z.id !== x.id)
        if(x.amount >1){
            dispatch(coinAmount(-x?.amount))
            setBasket([...selectedCardDelete],x.amount-x.amount)
            dispatch(moneySell(x.current_price*x.amount))
        }else if(x.amount ===1) {
            dispatch(coinAmount(-1))
            const removeItems = basket.filter((item)=>item.id !== x.id)
            dispatch(moneySell(x.current_price*x.amount))
            setBasket([...removeItems],x.amount--)
        }
    }

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

    return (
        <div className={"walletBtn"}>
            <Button size={"large"} type="primary" onClick={showModal}>
                Wallet
                <span className={"badge"}>
                            {coinsAmount}
                        </span>
            </Button>
            <Modal className={"modal"} title="Wallet" visible={isModalVisible} onOk={handleOk} okType={"danger"} okText={"Sell All Coins"}  onCancel={handleCancel}>
                <div className={"walletTotal"}>
                    <Button size={"large"}>Total : 100.000$ </Button>
                    <Button size={"large"}>{stateMoney} USD</Button>
                </div>
                {basket.map((x)=>(
                    <Card key={x.total_volume} className={"modalCard"}  bordered={true} style={{ width: 350 ,height:200 }}>
                        <div style={{display:"flex"}}>
                            <img src={x?.image} alt=""/>
                            <h2>{x.current_price} $</h2>
                            <CloseOutlined onClick={()=>removeItem(x)} className={"carpiButonu"}/>
                        </div>
                        <Button className={(x.market_cap_change_percentage_24h > 0) ? "artiPoint" : "eksiPoint"} size={"large"} >{x.market_cap_change_percentage_24h}</Button>
                        <div className={"flexBasketButton"}>
                            <Button onClick={()=>handleClickSell(x)} size={"large"} type="danger">Sell</Button>
                            <Button size={"large"} className={"amountModal"}><h4>x{x?.amount}</h4></Button>
                            <Button disabled={totalMoney<x.current_price} size={"large"} onClick={()=> handleClickBuy(x)} type="primary">Buy</Button>
                        </div>
                    </Card>
                ))}
            </Modal>
        </div>
    );
}

export default WalletBtn;

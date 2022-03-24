import './App.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './Redux/coinSlice'
import Header from "./Components/Header";
import Coins from "./Components/Coins";
import {default as axios} from "axios";




function App() {

    const [items,setItems] = useState([])
    const [amountluItem,setAmountluItem] = useState([])
    const [basket,setBasket] = useState([])
    const [totalCoinPrice,setTotalCoinPrice] = useState([])

    useEffect(()=> {
        const fetchCoins = async () => {
            await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=52&page=1&sparkline=false`).then((response)=>{
                response.json().then((json)=> {
                    setItems(json)
                })
            })
        }
        fetchCoins()
    },[])

    useEffect(()=>{
        setAmountluItem(items?.map((z)=>[{...z, amount: 0}]))
    },[items])



  return (
    <div className={"App"}>
        <Header setAmountluItem={setAmountluItem} amountluItem={amountluItem} items={items} setItems={setItems} totalCoinPrice={totalCoinPrice} setTotalCoinPrice={setTotalCoinPrice} basket={basket} setBasket={setBasket}/>
        <Coins totalCoinPrice={totalCoinPrice} setTotalCoinPrice={setTotalCoinPrice} basket={basket} setBasket={setBasket} items={items} amountluItem={amountluItem} setAmountluItem={setAmountluItem}/>
    </div>
  );
}

export default App;

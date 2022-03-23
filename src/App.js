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

    useEffect(()=> {
        const fetchCoins = async () => {
            await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`).then((response)=>{
                response.json().then((json)=> {
                    setItems(json)
                })
            })
        }
        fetchCoins()
    },[])

    useEffect(()=>{
        setAmountluItem(items?.map((z)=>[{...z, amount: 1}]))
    },[items])

    // useEffect(()=>{
    //     for(let i = 0; i<items.length; i++){
    //        setDeneme(amountluItem[i]?.map((x)=>x))
    //
    //     }
    // },[amountluItem])




  return (
    <div className={"App"}>
        <Header basket={basket} setBasket={setBasket}/>
        <Coins basket={basket} setBasket={setBasket} items={items} amountluItem={amountluItem} setAmountluItem={setAmountluItem}/>
    </div>
  );
}

export default App;

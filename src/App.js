import './App.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import Header from "./Components/header/Header";
import FirstComponentCoins from "./Components/coins/FirstComponentCoins";
import LandingPage from "./Components/LandingPage";

function App() {

    const [items,setItems] = useState([])
    const [amountluItem,setAmountluItem] = useState([])
    const [deneme,setDeneme] = useState([])
    const [basket,setBasket] = useState([])
    const [totalCoinPrice,setTotalCoinPrice] = useState([])
    const page = useSelector((state)=>state.coin.page)
    const profileNames = useSelector((state)=>state.coin.accountProfile)
    const onlyProfils = useSelector((state)=>state.coin.accountProfileOnly)
    const darkMode = useSelector((state)=>state.coin.darkMode)
    const addCoinsAmount = 52

    useEffect(()=> {
        const fetchCoins = async () => {
            await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${page*addCoinsAmount}&page=1&sparkline=false`)
                .then((response)=>{
                response.json().then((json)=> {
                    setItems(json)
                })
            })
        }
        fetchCoins()
    },[page])

    useEffect(()=>{
        setAmountluItem(items?.map((z)=>[{...z, amount: 0}]))
    },[items])


  return (
    <div className={darkMode ? "App" : null}>
        {profileNames&&onlyProfils ? <span>
            <Header
                deneme={deneme}
                setDeneme={setDeneme}
                setAmountluItem={setAmountluItem}
                amountluItem={amountluItem} items={items}
                setItems={setItems} totalCoinPrice={totalCoinPrice}
                setTotalCoinPrice={setTotalCoinPrice} basket={basket}
                setBasket={setBasket}
            />
            <FirstComponentCoins
                deneme={deneme}
                setDeneme={setDeneme}
                totalCoinPrice={totalCoinPrice}
                basket={basket}
                setBasket={setBasket}
                items={items}
                amountluItem={amountluItem}
                setAmountluItem={setAmountluItem}
            />
        </span>:  <LandingPage/>}


    </div>
  );
}

export default App;

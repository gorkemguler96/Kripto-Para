import React, {useEffect, useState} from 'react';
import coinsCSS from '../style/Coins.css'
import CardItems from "./CardItems";
import {default as axios} from "axios";


function Coins() {

    // const [coins,setCoins] = useState([])
    //
    // let options = {
    //     method: 'GET',
    //     url: 'https://coinranking1.p.rapidapi.com/coins',
    //     params: {
    //         referenceCurrencyUuid: 'yhjMzLPhuIDl',
    //         timePeriod: '24h',
    //         tiers: '1',
    //         orderBy: 'marketCap',
    //         orderDirection: 'desc',
    //         limit: '50',
    //         offset: '0'
    //     },
    //     headers: {
    //         'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    //         'x-rapidapi-key': 'b4da784865msh35dc80a85c1773dp18c3cdjsn881f5ef1cab5'
    //     }
    // };
    //
    // axios.request(options).then(function (response) {
    //    setCoins(response.data);
    // }).catch(function (error) {
    //     console.error(error);
    // });
    // console.log(coins)


    return (
        <div className={"Coins"}>
            <CardItems  />
        </div>
    );
}

export default Coins;

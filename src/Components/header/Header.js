import React from 'react';
import headerCss from '../../style/Header.css'
import SearchBar from "./headerChildComponents/SearchBar";
import ProfileBtn from "./headerChildComponents/ProfileBtn";
import WalletBtn from "./headerChildComponents/WalletBtn";
import ProfileDiv from "./headerChildComponents/ProfileDiv";
import TotalMoneyBtn from "./headerChildComponents/TotalMoneyBtn";
import {useSelector} from "react-redux";

function Header({basket, setBasket, setDeneme, items }) {

    const profileCheck = useSelector((state)=>state.coin.checkProfile)


    return (
        <div className={"fullHeader"}>
            <div className={"Header"}>
                <h1>crypto</h1>
                <div className={"HeaderButton"}>
                    <ProfileBtn/>
                    <WalletBtn setBasket={setBasket} basket={basket}/>
                    <TotalMoneyBtn/>
                </div>
                <SearchBar items={items} setDeneme={setDeneme}/>
            </div>
            <div className={"headerBottomColor"}></div>
            {profileCheck ? <ProfileDiv setBasket={setBasket}/> : null}
        </div>
);
}

export default Header;

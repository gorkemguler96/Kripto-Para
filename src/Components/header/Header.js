import React from 'react';
import headerCss from '../../style/Header.css'
import SearchBar from "./headerChildComponents/SearchBar";
import ProfileBtn from "./headerChildComponents/ProfileBtn";
import WalletBtn from "./headerChildComponents/WalletBtn";
import TotalMoneyBtn from "./headerChildComponents/TotalMoneyBtn";

function Header({basket, setBasket, setDeneme, items }) {
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
        </div>
    );
}

export default Header;

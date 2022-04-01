import React from 'react';
import AllCoins from "./listCoins/AllCoins";
import SearchBarCoins from "./listCoins/SearchBarCoins";

function FirstComponentCoins({deneme, setDeneme, amountluItem,setAmountluItem,items, basket, setBasket, totalCoinPrice }) {
    console.log(deneme)

    return (
        <div>
            {deneme.length > 0 ?
                <SearchBarCoins
                    deneme={deneme}
                    totalCoinPrice={totalCoinPrice}
                    basket={basket}
                    setBasket={setBasket}
                /> :
                <AllCoins
                    deneme={deneme}
                    setDeneme={setDeneme}
                    totalCoinPrice={totalCoinPrice}
                    basket={basket} setBasket={setBasket}
                    items={items}
                    amountluItem={amountluItem}
                    setAmountluItem={setAmountluItem}
                />}
        </div>
    );
}

export default FirstComponentCoins;

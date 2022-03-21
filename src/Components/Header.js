import React from 'react';
import {Button} from "antd";
import { Input, Space } from 'antd';
import headerCss from '../style/Header.css'

function Header(props) {

    const { Search } = Input;
    const onSearch = value => console.log(value);

    return (
        <div className={"fullHeader"}>
            <div className={"Header"}>
                <h1>crypto</h1>
                <div className={"HeaderButton"}>
                    <Button size={"large"} type="primary">Profile </Button>
                    <Button size={"large"} type="primary">Wallet </Button>
                    <Button size={"large"} type="primary">Profile </Button>
                    <Button size={"large"} type="primary">USD 100.000,00 </Button>
                </div>
                <Search
                    className={"Search"}
                    placeholder="Coin Name"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                />
            </div>
            <div className={"headerBottomColor"}></div>
        </div>
    );
}

export default Header;

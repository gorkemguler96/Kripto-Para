import React from 'react';
import {Input} from "antd";


function SearchBar({setDeneme,items}) {

    const { Search } = Input;
    const onSearch = value => setDeneme(items.filter((z)=>z.id.includes(value ? value.trim() : setDeneme([]))));

    return (
        <div className={"searchBar"}>
            <Search
                className={"Search"}
                placeholder="Coin Name"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
            />
        </div>
    );
}

export default SearchBar;

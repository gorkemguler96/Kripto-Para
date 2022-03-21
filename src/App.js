import './App.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './Redux/coinSlice'
import Header from "./Components/Header";
import Coins from "./Components/Coins";
import {default as axios} from "axios";




function App() {
  return (
    <div className={"App"}>
        <Header/>
        <Coins/>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Calculator = () => {

    const [have, setHave] = useState("USD");
    const [want, setWant] = useState("INR");
    const [amt, setAmt] = useState(0);
    const [curr, setCurr] = useState([]);
    const [newAmt, setNewAmt] = useState(0);

    const currencies = Object.keys(curr);

    useEffect(() => {
        axios
            .get('http://data.fixer.io/api/latest?access_key=caa2fc9c8d36809d03adbdb5cdf6e542')
            .then((res) => {
                setCurr(res.data.rates);
                console.log(curr);
            })
    }, []);

    const handleCalc = () => {
        setNewAmt(Number(amt * curr[want] / curr[have]).toFixed(4));
    }

    return (
        <div className='calc-div'>
            <div className='calculator'>
                <h1 className='calc-head'>Currency Converter</h1>
                <div className='money'>
                    <label className='curr-label' htmlFor='amt'>Enter Amount</label>
                    <input className='money-holder' id='amt' type='number' placeholder='Enter amount...' onChange={(e) => setAmt(e.target.value)}></input>
                </div>
                <div className='convert'>
                    <div className='from-div'>
                        <label className='curr-label' htmlFor='curr-type'>From</label>
                        <select className='curr-sel' id='curr-type' value={have} onChange={(e) => setHave(e.target.value)}>
                            {currencies.map((it) => {
                                return <option value={it}>{it}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <i className="fa-solid fa-right-left" style={{ color: "black" }}></i>
                    </div>
                    <div className='to-div'>
                        <label className='curr-label' htmlFor='curr-type'>To</label>
                        <select className='curr-sel' id='curr-type' value={want} onChange={(e) => setWant(e.target.value)}>
                            {currencies.map((it) => {
                                return <option value={it}>{it}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className='curr-sub'>
                    <p className='curr-info'>{amt} {have} = {newAmt} {want}</p>
                    <button className='sb-btn' onClick={handleCalc}>Convert</button>
                </div>
            </div>
        </div>
    )
}

export default Calculator;
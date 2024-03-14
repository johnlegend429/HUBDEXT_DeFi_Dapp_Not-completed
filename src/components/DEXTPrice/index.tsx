import { useState, useEffect } from "react";
import axios from "axios";



const DextPrice = () => {

    const [usd, setUsd] = useState([]);

    useEffect(() => {
        axios
        
        .get(`https://api.coingecko.com/api/v3/simple/price?ids=dextools&vs_currencies=usd&timestamp=${new Date().getTime()}`)
        .then((res) => {
            setUsd(res.data.dextools.usd.toFixed(3));
        })
    }, []);


  return <div className="dext-price"><img src="/assets/images/dextools-price.svg" alt="dextools-price-icon" /> ${usd}</div>;
};
export default DextPrice;
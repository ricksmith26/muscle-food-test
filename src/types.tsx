import Coins from "./components/Coins";

export interface Coin {
    weight: number,
    diameter: number,
    thickness: number,
    value: number
}


export interface Product {
    name: string,
    cost: number,
    qty: number
}

export interface CoinOb {
    [key: string]: Coin
}

export interface CoinProps {
    total: number;
    error: boolean;
    errorMSG: string;
    returnMoney: Function;
}

export interface VendingMachineState {
    total: number,
    rejectedCoinsCount: number,
    change: number,
    changeGiven: number,
    bank: number,
    errorMSG: boolean,
    error: string
}


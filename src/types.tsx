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

// export interface CoinCount {
//     qty: number;
//     coin: Coin
// }

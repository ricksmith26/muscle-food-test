import React from 'react';

import { pocketChange } from '../coinData';

import { Coin } from '../types'

export default function Coins(props: {countCoins: Function}) {

    return (

        <div className="coins centered">

            {Object.entries(pocketChange).map((coin: [string, Coin], i: number) => {

                return <button
                        className="coin-item"
                        onClick={() => {props.countCoins(coin[1])}} key={coin[0] + i}
                        data-testid={coin[0]}
                        id={coin[0]}>{coin[0]}</button>
            })}

        </div>
    )
}
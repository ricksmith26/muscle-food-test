import React from 'react';

export default function Coins(props: any) {
    return (
        <div className="coins centered">

            {Object.entries(props.pocketChange).map((coin, i) => {
                return <button className="coin-item" onClick={() => props.countCoins(coin[1])} key={coin[0] + i}>{coin[0]}</button>
            })}

        </div>
    )
}
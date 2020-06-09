import React from 'react';

export default function CoinSlot(props: any) {

    return (
        <div>
            <div className="coin-total">{props.total === 0 && !props.error ? 'Insert Coins' : (props.error ? `${props.errorMSG}` : `Total: $${props.total.toFixed(2)}`)}</div>
            <button className="return-total" onClick={() => props.returnMoney()}>Return coins</button>
        </div>
    )
}
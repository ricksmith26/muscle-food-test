import React from 'react';

export default function CoinSlot(props: CoinProps) {

    return (

        <div>

            <div data-testid="coin-total" className="coin-total">{props.total === 0 && !props.error ? 'Insert Coins' : (props.error ? `${props.errorMSG}` : `Total: $${props.total.toFixed(2)}`)}</div>

            <button data-testid="return-total" className="return-total" onClick={() => props.returnMoney()}>Return coins</button>

        </div>
    )
}

export interface CoinProps {
    total: number;
    error: boolean;
    errorMSG: string;
    returnMoney: Function;
}

import React from 'react';

export default function RejectedCoins(props: any) {
    return  (
            <div className="rejected-coins">
                <div>Rejected Coins: {props.rejectedCoinsCount}</div>
                {props.changeGiven !== 0 ? <div>Change Given: ${props.changeGiven.toFixed(2)}</div> : null}
            </div>
            )
}
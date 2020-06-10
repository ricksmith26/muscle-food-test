import React from 'react';

export default function RejectedCoins(props: any) {
      
    return  (

            <div className="rejected-coins">

                <div data-testid="rejected-coins">Rejected Coins: {props.rejectedCoinsCount}</div>
                {props.changeGiven !== 0 ? <div data-testid="change-given">Change Given: ${props.changeGiven.toFixed(2)}</div> : null}

            </div>
            )
}
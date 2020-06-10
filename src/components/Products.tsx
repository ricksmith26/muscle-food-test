import React from 'react';
import { Product } from '../types';

export default function Products(props: {products: Product[], orderProduct: Function }) {

    return (

        <div className="centered" style={{width: '600px'}}>

            {props.products.map((product: Product, i: number) => {

                return <button
                        data-testid={product.name}
                        className="product-box"
                        onClick={() => props.orderProduct(product, i)}
                        key={product.name}>{`${product.name}: $${product.cost}`}
                        </button>
            })}

        </div>
        
    )
}
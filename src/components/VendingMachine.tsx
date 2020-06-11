import React, {Component} from 'react';

import {Coin, Product } from '../types';
import { products, validCoins } from '../coinData';
import Products from '../components/Products';
import CoinSlot from '../components/CoinSlot';
import RejectedCoins from '../components/RejectedCoins'
import Coins from '../components/Coins';

class VendingMachine extends Component {

	state = {
		total: 0,
		rejectedCoinsCount: 0,
		change: 0,
		changeCoins: [],
		errorMSG: '',
		error: false,
		changeGiven: 0, 
		products: [],
		bank: 10
	}

	//adds coins to total
	public countCoins = (addedCoin: Coin) => {
		const coinRefs = Object.values(validCoins)
		let validCoin = false;

		coinRefs.forEach((coinRef) => {
			if (coinRef.diameter === addedCoin.diameter
				&& coinRef.weight === addedCoin.weight
				&& coinRef.thickness === addedCoin.thickness) {
				validCoin = true
			}
		})

		if (validCoin) {
			this.setState({total: this.state.total + addedCoin.value })
		} else {
			const rejectedCoinsCount = this.state.rejectedCoinsCount + 1;
			this.setState({rejectedCoinsCount})
		}
	}

	public orderProduct = (product: Product, i: number) => {
		// if sold out
		if (product.qty === 0) {
            return this.ifSoldOut(product);
		}
		// checks enough money is given
		if (product.cost <= this.state.total) {
			this.successfulPurchase(product, i)
		}
		//not Enough Funds
		if (product.cost > this.state.total) {
			this.notEnoughFunds(product)
		}
		// resets errors
		if (this.state.total === 0) {
			this.setState({total: 0, error: false, changeGiven: 0})
		}
		// error for exact change given created
		if (this.state.bank < 0.15) {
			this.notEnoughChangeInBank()
		}
    }
    
    public ifSoldOut(product: Product) {
        return this.setState({error: true, errorMSG: 'SOLD OUT'}        
                , () =>{ 
                setTimeout(() => {
                    this.setState({error: false})
                }, 5000)})
    }

    public successfulPurchase(product: Product, i: number) {
        products[i].qty-= 1; 
        this.setState({changeGiven: this.state.total - product.cost, total: 0, bank: this.state.bank + product.cost}, () => {
                setTimeout(() => {
                    this.setState({changeGiven: 0})
                }, 5000)
            })
    }

    public notEnoughFunds(product: Product) {
        this.setState({error: true, errorMSG: `PRICE: $${product.cost}`}, () => {
			setTimeout(() => {
				this.setState({error: false, errorMSG: ''})
			}, 5000)
        })
    }

    public notEnoughChangeInBank() {
        this.setState({error: true, errorMSG: 'EXACT CHANGE NEEDED'})
			setTimeout(() => {
				this.setState({error: false, errorMSG: ''})
			}, 5000)
    }

	public returnMoney = () => {
		const change = this.state.total;
		this.setState({total: 0, changeGiven: change})
    }

    private getCoinSlotSearchBarProps = () => {

        return {
            error: this.state.error,
            errorMSG: this.state.errorMSG,
            returnMoney: this.returnMoney,
            total: this.state.total
        }
    }

	render() {

		return ( 
			<div className="App">

				Vending machine

				<div className="products-container centered">

					<Products
						orderProduct={this.orderProduct}
						products={products}
						></Products>

					<CoinSlot
						{...this.getCoinSlotSearchBarProps()}
						></CoinSlot>
					
					<RejectedCoins
                        changeGiven={this.state.changeGiven}
                        rejectedCoinsCount={this.state.rejectedCoinsCount}
						></RejectedCoins>
					
				</div>

				<Coins countCoins={this.countCoins}></Coins>

			</div>
		);
	}

}

export default VendingMachine;
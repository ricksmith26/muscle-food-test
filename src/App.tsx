import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import {Coin, Product } from './types';
import {validCoins, pocketChange, products} from './coinData';
import Products from './components/Products';
import CoinSlot from './components/CoinSlot';
import RejectedCoins from './components/RejectedCoins'
import Coins from './components/Coins';

class App extends Component {

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

	async componentDidMount() {
	}

	render() {
		return (
			<div className="App">
				Vending machine
				<div className="products-container centered">

					<Products orderProduct={this.orderProduct} products={products}></Products>

					<CoinSlot
						errors={this.state.error}
						returnMoney={this.returnMoney}
						total={this.state.total}
						></CoinSlot>
					
					<RejectedCoins
						rejectedCoinsCount={this.state.rejectedCoinsCount}
						changeGiven={this.state.changeGiven}
						countCoins={this.countCoins}
						></RejectedCoins>
					
				</div>

				<Coins
					pocketChange={pocketChange}
					countCoins={this.countCoins}
					></Coins>
				

			</div>
		);
	}
	
	countCoins = (addedCoin: Coin) => {
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
			this.setState({total: this.state.total + addedCoin.value }, () => console.log(this.state.total))
		} else {
			const rejectedCoinsCount = this.state.rejectedCoinsCount + 1;
			this.setState({rejectedCoinsCount})
		}
	}

	orderProduct = (product: Product, i: number) => {
		// if sold out
		if (product.qty === 0) {
			return this.setState({error: true, errorMSG: 'SOLD OUT'}
					, () =>{ 
					
					setTimeout(() => {
						this.setState({error: false})
					}, 5000)})
		}
		// checks enough money is given
		if (product.cost <= this.state.total) {
			products[i].qty-= 1; 
			this.setState({changeGiven: this.state.total - product.cost, total: 0, bank: this.state.bank + product.cost}, () => {
				setTimeout(() => {
					this.setState({changeGiven: 0})
				}, 5000)
			})
		}
		if (product.cost > this.state.total) {
			this.setState({error: true, errorMSG: `$${product.cost - this.state.total} needed`}, () => {
				this.setState({error: false, errorMSG: ''})
			})
		}
		// resets errors
		if (this.state.total === 0) {
			this.setState({total: 0, error: false, changeGiven: 0})
		}
		// error for exact change given created
		if (this.state.bank < 0.35) {
			this.setState({error: true, errorMSG: 'EXACT CHANGE NEEDED'})
			setTimeout(() => {
				this.setState({error: false, errorMSG: ''})
			}, 5000)
		}
	}

	returnMoney = () => {
		const change = this.state.total;
		this.setState({total: 0, changeGiven: change})
	}
}

export default App;
// import React from 'react';

// const App = () => <div className="app-container" >Vending machine</div>;

// export default App;
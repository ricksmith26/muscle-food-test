import { render, fireEvent, getNodeText } from '@testing-library/react';
import React from 'react';
import VendingMachine from './VendingMachine'

const setup = () => {
	const utils = render(<VendingMachine />)
	const quarterCoin = utils.getByTestId('quarter');
	const dimeCoin = utils.getByTestId('dime');
	const nickelCoin = utils.getByTestId('nickel');
	const centCoin = utils.getByTestId('cent');
	const dollarCoin = utils.getByTestId('dollar');
	const total = utils.getByTestId('coin-total');
	const cola = utils.getByTestId('cola');
	const chips = utils.getByTestId('chips');
	const candy = utils.getByTestId('candy');
	const returnTotal = utils.getByTestId('return-total');


	return {
		utils,
		quarterCoin,
		nickelCoin,
		dimeCoin,
		centCoin,
		dollarCoin,
		total,
		cola,
		chips,
		candy,
		returnTotal
	}
}

describe('UI elements have the correct affect on UI', () => {

	test('Clicking the coin element adds to the total on the coin slot element', () => {
	
		const { quarterCoin, total } = setup()
	
		fireEvent.click(quarterCoin);
	
		expect(getNodeText(total)).toMatch('Total: $0.25');
	})
	
	test('If an item is sold out on attempted purchase SOLD OUT will appear on coin slot', () => {
	
		const { quarterCoin, total, cola } = setup()
	
		fireEvent.click(quarterCoin);
		fireEvent.click(quarterCoin);
		fireEvent.click(quarterCoin);
		fireEvent.click(quarterCoin);
		fireEvent.click(cola);
		fireEvent.click(quarterCoin);
		fireEvent.click(quarterCoin);
		fireEvent.click(quarterCoin);
		fireEvent.click(quarterCoin);
		fireEvent.click(cola);
	
		expect(getNodeText(total)).toMatch('SOLD OUT');
	})
	
	test('If an item is sold the correct change is given', () => {
	
		const { quarterCoin, total, chips, utils, candy } = setup()
	
		fireEvent.click(quarterCoin);
		fireEvent.click(quarterCoin);
		fireEvent.click(quarterCoin);
		fireEvent.click(candy);
	
		const changeGivenCandy = utils.getByTestId('change-given');
	
		expect(getNodeText(changeGivenCandy)).toMatch('Change Given: $0.10');
		expect(getNodeText(total)).toMatch('Insert Coins');
	
		fireEvent.click(quarterCoin);
		fireEvent.click(quarterCoin);
		fireEvent.click(quarterCoin);
		fireEvent.click(candy);
	
		const changeGivenChips = utils.getByTestId('change-given');
	
		fireEvent.click(quarterCoin);
		fireEvent.click(quarterCoin);
		fireEvent.click(quarterCoin);
		fireEvent.click(chips);
	
		expect(getNodeText(changeGivenChips)).toMatch('Change Given: $0.25');
		expect(getNodeText(total)).toMatch('Insert Coins');
	})
	
	test('Invalid coins are rejected', () => {
	
		const { dollarCoin, centCoin, total, utils } = setup();
	
		const rejected = utils.getByTestId('rejected-coins');
	
		fireEvent.click(dollarCoin);
		fireEvent.click(centCoin);
	
		expect(getNodeText(rejected)).toMatch('Rejected Coins: 2');
		expect(getNodeText(total)).toMatch('Insert Coins')
	
	})
	
	test('Coins add up correctly', () => {
	
		const { quarterCoin, nickelCoin, dimeCoin, total  } = setup()
	
		fireEvent.click(quarterCoin);
	
		expect(getNodeText(total)).toMatch('Total: $0.25');
	
		fireEvent.click(nickelCoin);
	
		expect(getNodeText(total)).toMatch('Total: $0.30');
	
		fireEvent.click(dimeCoin);
	
		expect(getNodeText(total)).toMatch('Total: $0.40');
	
	})
	
	test('Coins are returned if requested', () => {
	
		const { quarterCoin, returnTotal, total, utils } = setup()
	
		fireEvent.click(quarterCoin);
		fireEvent.click(returnTotal);
		
		const changeGivenChips = utils.getByTestId('change-given');
	
		expect(getNodeText(total)).toMatch('Insert Coins');
		expect(getNodeText(changeGivenChips)).toMatch('Change Given: $0.25');
		
	})
	
	test('Price displayed is not enough funds', () => {
	
		const { quarterCoin,  total, candy } = setup()
	
		fireEvent.click(quarterCoin);
		fireEvent.click(candy);
	
		expect(getNodeText(total)).toMatch('PRICE: $0.65');
		
	})
})

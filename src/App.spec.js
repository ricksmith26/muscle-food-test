import React from 'react';
import { shallow } from 'enzyme';
import { render, fireEvent, getNodeText } from '@testing-library/react';
import App from './App';
import Products from './components/Products';
import CoinSlot from './components/CoinSlot';
import RejectedCoins from './components/RejectedCoins';
import VendingMachine from './components/VendingMachine';
import Coins from './components/Coins';
import { pocketChange, products } from './coinData';
import "../setupTests"

describe('App', () => {
	let wrapper;

	beforeEach(() => wrapper = shallow(<App />));

	it('should render correctly', () => expect(wrapper).toMatchSnapshot());

	it('should render a <div />', () => {

		expect(wrapper.find('div').length).toEqual(0);
	});	
});

describe('Vending Machine' , () => {

	let wrapper;

	beforeEach(() => wrapper = shallow(<VendingMachine />));

	it('should render the Products Component', () => {
		expect(wrapper.containsMatchingElement(<Products />)).toEqual(true);
	});

	it('should render the Coin Slot Component', () => {
		expect(wrapper.containsMatchingElement(<CoinSlot />)).toEqual(true);
	});

	it('should render the Rejected Coins Component', () => {
		expect(wrapper.containsMatchingElement(<RejectedCoins/>)).toEqual(true);
	});

	it('should render the Display Component', () => {
		expect(wrapper.containsMatchingElement(
		  <CoinSlot total={wrapper.instance().state.total} />
		)).toEqual(true);
	});
})


describe('Products', () => {
	let wrapper;

	beforeEach(() => wrapper = shallow(<Products products={products}/>));

	it('should render correctly', () => expect(wrapper).toMatchSnapshot());

	it('should render a <div />', () => {

		expect(wrapper.find('div').length).toEqual(1);
	});

	it('should render a buttons', () => {

		expect(wrapper.find('button').length).toEqual(3);
	});
})

describe('Coin Slot', () => {
	let wrapper;

	beforeEach(() => wrapper = shallow(<CoinSlot total={1}/>));

	it('should render correctly', () => expect(wrapper).toMatchSnapshot());

	it('should render a <div />', () => {

		expect(wrapper.find('div').length).toEqual(2);
	});

	it('should render a button', () => {

		expect(wrapper.find('button').length).toEqual(1);
	});

	it('renders the value of total', () => {
		wrapper.setProps({ total: 1 });
		expect(wrapper.text()).toMatch('Total: $1.00');
	});

})

describe('Coins', () => {
	let wrapper;

	beforeEach(() => wrapper = shallow(<Coins pocketChange={pocketChange} />));

	it('should render correctly', () => expect(wrapper).toMatchSnapshot());

	it('should render a <div />', () => {

		expect(wrapper.find('div').length).toEqual(1);
	})

	it('should add coins', () => {

		const mockCallBack = jest.fn();

		const button = shallow((<Coins
								pocketChange={pocketChange}
								countCoins={mockCallBack}jest
								>Ok!</Coins>));

		button.find('#quarter').prop('onClick')();
		
		expect(mockCallBack.mock.calls.length).toEqual(1);
	})
})

describe('Rejected Coins', () => {
	let wrapper;

	beforeEach(() => wrapper = shallow(<RejectedCoins changeGiven={0}/>));

	it('should render correctly', () => expect(wrapper).toMatchSnapshot());

	it('should render a <div />', () => {

		expect(wrapper.find('div').length).toEqual(2);

	});

	it('renders the value of total', () => {

		wrapper.setProps({ rejectedCoinsCount: 1 });

		expect(wrapper.find('.rejected-coins').text()).toMatch('Rejected Coins: 1');
	});

	it('renders the value of total', () => {

		wrapper.setProps({ changeGiven: 1.25 });

		expect(wrapper.find('.rejected-coins').text()).toMatch('Change Given: $1.25');
	});
	
})


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

test('None valid coins are rejected', () => {

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

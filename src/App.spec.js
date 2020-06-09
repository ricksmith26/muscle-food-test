import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Products from './components/Products';
import CoinSlot from './components/CoinSlot';
import RejectedCoins from './components/RejectedCoins';
import {validCoins, pocketChange, products} from './coinData';
import "../setupTests"

describe('App', () => {
	let wrapper;

	beforeEach(() => wrapper = shallow(<App />));

	it('should render correctly', () => expect(wrapper).toMatchSnapshot());

	it('should render a <div />', () => {

		expect(wrapper.find('div').length).toEqual(2);
	});

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
	
});


describe('Products', () => {
	let wrapper;

	beforeEach(() => wrapper = shallow(<Products products={products}/>));

	it('should render a <div />', () => {

		expect(wrapper.find('div').length).toEqual(1);
	});

	it('should render a buttons', () => {

		expect(wrapper.find('button').length).toEqual(3);
	});
})

describe('Coin Slot', () => {
	let wrapper;

	beforeEach(() => wrapper = shallow(<CoinSlot pocketChange={pocketChange} total={1}/>));

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


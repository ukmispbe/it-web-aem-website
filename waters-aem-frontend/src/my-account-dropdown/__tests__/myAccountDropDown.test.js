jest.mock('../../stores/sessionStore');
jest.mock('../../scripts/ecommerce');
jest.mock('../../scripts/checkOutStatus');

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { funcs as UserDetailFuncs} from '../my-account-user-details';
import ItemList, { MyOrderClass } from '../my-account-item-list';
import MyAccountContainer from '../my-account-container';

//Mocked Props
import DefaultProps from '../__mocks__/en_US/index';

//Mocked Imports
import Ecommerce from '../../scripts/ecommerce';
import CheckOutStatus from '../../scripts/checkOutStatus';

const keys = {
	userName: '.my-account-dropdown__user-details__name',
	account: '.my-account-dropdown__user-details__account',
	accountName: '.my-account-dropdown__user-details__account__name',
	accountNumber: '.my-account-dropdown__user-details__account__number',
	switchAccount: '.my-account-dropdown__user-details__switch-account',
	itemList: '.my-account-dropdown__item-list',
	itemListLink: '.my-account-dropdown__item-list--link',
	myOrderLink: '.' + MyOrderClass
};

const buildShallowWrapper = (Component, props, mockValues = undefined) => {
	if (Array.isArray(mockValues)) {
		setMockValues(mockValues);
	}
	const wrapper = shallow(<Component {...props} />);
	return wrapper;
};

const setMockValues = ([DisabledState, PartialState, CheckOutState]) => {
	Ecommerce.isDisabledState = jest.fn(() => {
		return DisabledState;
	});

	Ecommerce.isPartialState = jest.fn(() => {
		return PartialState;
	});

	CheckOutStatus.state = jest.fn(() => {
		return CheckOutState;
	});
};

const buildNewProps = (orginalProps, newProps) =>
	Object.assign({}, orginalProps, newProps);

describe('Feature: My Account Dropdown Component', () => {
	describe('Scenario: Rendering User Details', () => {
		const props = {
			userName: DefaultProps.config.userDetails.userName,
			accountName: DefaultProps.config.userDetails.accountName,
			switchAccount: DefaultProps.config.switchAccount,
		};

		describe('When there is a User Name', () => {
			it('Then it should render', () => {
				const wrapper = buildShallowWrapper(
					UserDetailFuncs.renderUserName,
					props
				);
				const indexLink = wrapper.find(keys.userName).first();
				expect(indexLink.text()).toEqual(props.userName);
			});
        });

		describe('When there is not a User Name', () => {
			it('Then it should not render', () => {
				const wrapper = buildShallowWrapper(
					UserDetailFuncs.renderUserName,
					buildNewProps(props, { userName: '' })
				);
				expect(wrapper.exists(keys.userName)).toEqual(false);
			});
		});

		describe('Given that there is at least one valid SoldToAccount Account from SAP', () => {

			describe('When there is an Account Name', () => {
				it('Then an Account Name should render', () => {
					const spy = jest.spyOn(CheckOutStatus, 'length', 'get').mockReturnValue(1);
					const wrapper = buildShallowWrapper(
						UserDetailFuncs.renderAccountDetails,
						props
					);
					const AccountName = wrapper.find(keys.accountName);
					expect(AccountName.text()).toEqual(props.accountName);
					spy.mockClear();
				});
			});

			describe('When there is not an Account Name ', () => {
				it('Then no Account Name should render', () => {
					const spy = jest.spyOn(CheckOutStatus, 'length', 'get').mockReturnValue(1);
					const wrapper = buildShallowWrapper(
						UserDetailFuncs.renderAccountDetails,
						buildNewProps(props, { accountName: '' })
						);
					expect(wrapper.exists(keys.accountName)).toEqual(false);
					spy.mockClear();
				});
			});	
		});

		describe('Given that there is more than one SoldToAccount Account from SAP', () => {
			describe('When there is an authored Switch Account URL & text', () => {
				it('Then the link should render', () => {
					const spy = jest.spyOn(CheckOutStatus, 'length', 'get').mockReturnValue(2);
					const wrapper = buildShallowWrapper(
						UserDetailFuncs.renderSwitchAccountLink,
						props
					);
					const SwitchAccount = wrapper.find(keys.switchAccount);
					expect(SwitchAccount.text()).toEqual(props.switchAccount.text);
					expect(SwitchAccount.prop('href')).toEqual(props.switchAccount.url);
					spy.mockClear()
				});
			});
		});

		describe('Given that there is one or less SoldToAccount Account from SAP', () => {
			describe('When there is an authored Switch Account URL & text', () => {
				it('Then the link should not render', () => {
					const spy = jest.spyOn(CheckOutStatus, 'length', 'get').mockReturnValue(1);
					const wrapper = buildShallowWrapper(
						UserDetailFuncs.renderSwitchAccountLink,
						props
					);
					expect(wrapper.exists(keys.switchAccount)).toEqual(false);
					spy.mockClear()
				});
			});
		});

		describe('When there is no authored Switch Account URL ', () => {
			it('Then the link should not render', () => {
				const spy = jest.spyOn(CheckOutStatus, 'length', 'get').mockReturnValue(3);
				const wrapper = buildShallowWrapper(
					UserDetailFuncs.renderSwitchAccountLink,
					buildNewProps(props, {
						switchAccount: {
							text: 'Switch Account',
							url: '',
						},
					})
				);
				expect(wrapper.exists(keys.switchAccount)).toEqual(false);
				spy.mockClear()
			});
		});

		describe('When there is no authored Switch Account text ', () => {
			it('Then the link should not render', () => {
				const spy = jest.spyOn(CheckOutStatus, 'length', 'get').mockReturnValue(4);
				const wrapper = buildShallowWrapper(
					UserDetailFuncs.renderSwitchAccountLink,
					buildNewProps(props, {
						switchAccount: {
							text: '',
							url: 'http://www.waters.com',
						},
					})
				);
				expect(wrapper.exists(keys.switchAccount)).toEqual(false);
				spy.mockClear()
			});
		});

		describe('Given that there is not one valid SoldToAccount Account from SAP', () => {
			describe('When there there thus is not an Account Number or Account Name', () => {
				it('Then neither should render', () => {
					const spy = jest.spyOn(CheckOutStatus, 'length', 'get').mockReturnValue(0);
					const wrapper = buildShallowWrapper(
						UserDetailFuncs.renderAccountDetails,
						buildNewProps(props, { accountName: '', accountNumber: '' })
					);
					expect(wrapper.exists(keys.account)).toEqual(false);
					spy.mockClear()
				});
			});
		});
	
	});

	describe('Scenario: Rendering ItemList', () => {
		const props = {
			itemList: DefaultProps.config.itemList,
		};

		describe('Given there is an array of Objects{text, url} as props', () => {
			describe(`When this itemList has a length of ${props.itemList.length}`, () => {
				const wrapper = buildShallowWrapper(ItemList, props, [false, false, false]);
				const links = Array.from(wrapper.find(keys.itemListLink));

				for (let i = 0; i < links.length; i++) {
					const count = `${i + 1} of ${props.itemList.length}`;
					it(`Then each item should be rendered into a link : ${count}`, () => {
						const linkText = links[i].props.children.props.children;
						const linkUrl = links[i].props.href;
						expect(linkText).toBe(props.itemList[i].text);
						expect(linkUrl).toBe(props.itemList[i].url);
					});
				}
			});
		});

		describe(`Given one item in ItemList has a class of 'dropdown__list__item__my-orders'`, () => {
			// Testing shouldRender() of ItemList
			describe(`When in a fully disabled Ecommerce state '`, () => {
				it(`Then 'my-orders' link should not render `, () => {
					const wrapper = buildShallowWrapper(ItemList, props, [true,false,false]);
					expect(wrapper.exists(keys.myOrderLink)).toEqual(false);
				});
			});

			describe(`When in a partialy disabled Ecommerce state without a SAP account  '`, () => {
				it(`Then 'my-orders' link should not render `, () => {
					const wrapper = buildShallowWrapper(ItemList, props, [false,true,false]);
					expect(wrapper.exists(keys.myOrderLink)).toEqual(false);
				});
			});

			describe(`When in a partialy disabled Ecommerce state with a SAP account  '`, () => {
				it(`Then 'my-orders' link should render `, () => {
					const wrapper = buildShallowWrapper(ItemList, props, [false,true,true]);
					expect(wrapper.exists(keys.myOrderLink)).toEqual(true);
				});
			});

			describe(`When in a full enabled Ecommerce state'`, () => {
				it(`Then 'my-orders' link should render `, () => {
					const wrapper = buildShallowWrapper(ItemList, props, [false,false,true]);
					expect(wrapper.exists(keys.myOrderLink)).toEqual(true);
				});
			});
		});
	});

	describe('Scenario: Rendering My Account Dropdown with all props', () => {
		describe('When logged in & more than one SoldTo account', () => {
			it('Then the snapshot should match', () => {
				const spy = jest.spyOn(CheckOutStatus, 'length', 'get').mockReturnValue(2);
				const props = buildNewProps(DefaultProps.config, {
					loginState: true,
				});
				const json = renderer.create(<MyAccountContainer config={props} />);
				expect(json).toMatchSnapshot();
				spy.mockClear()
			});
		});

		describe('When logged in & only one SoldTo account', () => {
			it('Then the snapshot should match', () => {
				const spy = jest.spyOn(CheckOutStatus, 'length', 'get').mockReturnValue(1);
				const props = buildNewProps(DefaultProps.config, {
					loginState: true,
				});
				const json = renderer.create(<MyAccountContainer config={props} />);
				expect(json).toMatchSnapshot();
				spy.mockClear()
			});
		});

		describe('When logged in & no SoldTo account', () => {
			it('Then the snapshot should match', () => {
				const spy = jest.spyOn(CheckOutStatus, 'length', 'get').mockReturnValue(0);
				const props = buildNewProps(DefaultProps.config, {
					loginState: true,
				});
				const json = renderer.create(<MyAccountContainer config={props} />);
				expect(json).toMatchSnapshot();
				spy.mockClear()
			});
		});

		describe('When logged out', () => {
			it('Then the snapshot should match', () => {
				const props = buildNewProps(DefaultProps.config, {
					loginState: false,
				});
				const json = renderer.create(<MyAccountContainer config={props} />);
				expect(json).toMatchSnapshot();
			});
		});
	});
});

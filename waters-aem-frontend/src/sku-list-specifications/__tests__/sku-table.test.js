import React from 'react';
import { shallow } from 'enzyme';

//Mocked Props
import SkuTable from '../views/sku-table';
import { props, skuListData } from '../sku-table.mock';


describe('<SkuTable />', () => {
    let enzymeWrapper;
    
    beforeAll(() => {        
        enzymeWrapper = shallow(<SkuTable {...props} />);
    });
    it('should render without throwing an error', () => {
        expect(enzymeWrapper).toMatchSnapshot();
    }); 
    
    it('should render with sku data ', () => {
        const wrapper = shallow(<SkuTable {...skuListData} />)
        expect(wrapper).toMatchSnapshot();
    }); 
});
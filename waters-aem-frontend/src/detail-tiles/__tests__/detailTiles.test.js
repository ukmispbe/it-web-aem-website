import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import DetailTile from '../index';

const buildShallowWrapper = props => {
    const wrapper = shallow(<DetailTile.WrappedComponent {...props} />);
    return wrapper;
};

describe('Feature: Detail Tiles Component', () => {
    describe('Scenario: Rendering Personal Details', () => {
        describe('When this is filler', () => {
            it('Then it should work', () => {
                expect(true).toEqual(true);
            });
        });
    });
});

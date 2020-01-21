import React from 'react';
import { shallow } from 'enzyme';

import LinkTile from '../index';

const keys = {
    linkTile: '.cmp-linktile',
    linkTileIcon: '.cmp-linktile--icon',
    linkTileTitle: '.cmp-linktile--title',
    linkTileLinks: '.cmp-linktile--links',
};

//Mocked Props
import DefaultProps from '../__mocks__/en_US/index';

const buildShallowWrapper = (Component, props, mockValues = undefined) => {
    if (Array.isArray(mockValues)) {
		setMockValues(mockValues);
	}
	const wrapper = shallow(<Component {...props} />);
	return wrapper;
};

describe('Feature: Link Tile Component', () => {
    describe('Scenario: Rendering Link Tile', () => {
        describe('When all props are present', () => {
            let wrapper;
            let linkTileCmps, linkTileCmp;

            beforeAll(() => {
                wrapper = buildShallowWrapper(
                    LinkTile,
                    DefaultProps
                );

                linkTileCmps = wrapper.find(keys.linkTile);
                linkTileCmp = linkTileCmps.first();
            });

            it('Then it should render the link tile component', () => {
                expect(linkTileCmps.length).toEqual(1);
            });

            it('Then it should have the proper title', () => {
                expect(linkTileCmp.find(keys.linkTileTitle).first().text()).toEqual(DefaultProps.title);
            });

            it('Then it should render the icon', () => {
                expect(linkTileCmp.find(keys.linkTileIcon).length).toEqual(1);
            });

            it('Then it should render the links', () => {
                expect(linkTileCmp.find(keys.linkTileLinks).length).toEqual(DefaultProps.links.length);
            });
        });
    });
});
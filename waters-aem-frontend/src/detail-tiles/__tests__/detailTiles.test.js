jest.mock('../../stores/sessionStore');

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import DetailTile from '../index';
import Tile from '../views/tile';

//Mocked Props
import { defaultProps } from '../__mocks__/en_US/index';

const keys = {
    tilesTitle: '.cmp-detail-tiles--title',
    addTile: '.cmp-detail-tiles--add',
    emptyTileListTile: '.cmp-detail-tiles-list--tile.no-address',
    nonEmptyTileListTile: '.cmp-detail-tiles-list--tile',
    nonEmptyTileListTileID: `#${defaultProps.tileName}`,
    tileColumn: '.cmp-detail-tiles-list--tile-column',
    tileColumnTitle: '.cmp-detail-tiles-list--tile-column--title',
    tileColumnText: '.cmp-detail-tiles-list--tile-column--text',
    editColumn: '.cmp-detail-tiles-list--tile-edit',
    emptyTileListTileTitle: '.cmp-detail-tiles-list--tile-noAddress--title',
    emptyTileListTileAdd: '.cmp-detail-tiles--add',
    emptyTileListTileAddTitle: '.cmp-detail-tiles--add-title',
    notification: '.cmp-detail-tiles-list--tile-notification-wrapper',
    notificationTitle: '.cmp-detail-tiles-list--tile-notification--title',
    notificationDesc: '.cmp-detail-tiles-list--tile-notification--description',
    formShown: '.cmp-detail-tiles-list--tile.form-shown',
    form: '.cmp-detail-tiles-list--form',
    formHidden: '.cmp-detail-tiles-list--form.hidden',
    cancelBtn: '.cmp-button.cmp-button--cancel'
};

const buildShallowWrapper = (Component, props, mockValues = undefined) => {
    if (Array.isArray(mockValues)) {
        setMockValues(mockValues);
    }
    const wrapper = shallow(<Component {...props} />);
    return wrapper;
};

describe('Feature: Detail Tiles Component', () => {
    describe('Scenario: Rendering Tile List', () => {
        describe('When title is present', () => {
            it('Then it should render title for list', () => {
                const wrapper = buildShallowWrapper(DetailTile, defaultProps);

                const titleDiv = wrapper.find(keys.tilesTitle).first();
                expect(titleDiv.text()).toEqual(defaultProps.title);
            });
        });
        // Add Tile
        // Don't add tile
    });

    describe('Scenario: Rendering Individual Tile', () => {
        let wrapper;
        const props = {
            name: defaultProps.tileName,
            columns: defaultProps.columns,
            defaultValues: defaultProps.defaultValues,
            form: defaultProps.form,
            formMessage: defaultProps.formMessage,
            icon: defaultProps.icons.edit
        };

        beforeAll(() => {
            wrapper = buildShallowWrapper(Tile, props);
        });

        describe('When name is present', () => {
            it('Then it should render a tile with name as the id', () => {
                const tile = wrapper.find(keys.nonEmptyTileListTile);
                expect(tile).toHaveLength(1);
                const tileID = wrapper.find(keys.nonEmptyTileListTileID);
                expect(tileID).toHaveLength(1);
            });
        });

        describe('When columns is provided', () => {
            it('Then it should render columns', () => {
                expect(wrapper.exists(keys.tileColumn)).toEqual(true);
            });

            it('Then it should display title provided', () => {
                const title = wrapper.find(keys.tileColumnTitle).first();
                expect(title.text()).toEqual(props.columns[0].title);
            });

            it('Then it should display text provided', () => {
                const text = wrapper.find(keys.tileColumnText).first();
                expect(text.text()).toEqual(props.columns[0].rows[0].text);
            });

            it('Then it should display # of columns (based upon columns length)', () => {
                const columns = wrapper.find(keys.tileColumn);
                expect(columns).toHaveLength(props.columns.length);
            });

            it('Then it should display # of rows of text (based upon text array length)', () => {
                const columns = wrapper.find(keys.tileColumn);
                columns.forEach((column, idx) => {
                    const rows = column.find(keys.tileColumnText);
                    const rowLength = rows.length;
                    expect(props.columns[idx].rows).toHaveLength(rowLength);
                });
            });

            it('Then it should display all proper title per column', () => {
                const columns = wrapper.find(keys.tileColumn);
                columns.forEach((column, idx) => {
                    let title = column.find(keys.tileColumnTitle).first();

                    if (props.columns[idx].title !== '') {
                        expect(title.text()).toEqual(props.columns[idx].title);
                    }
                });
            });

            it('Then it should display all proper text per column', () => {
                const columns = wrapper.find(keys.tileColumn);
                columns.forEach((column, idx) => {
                    let rows = column.find(keys.tileColumnText);

                    rows.forEach((row, jdx) => {
                        expect(row.text()).toEqual(
                            props.columns[idx].rows[jdx].text
                        );
                    });
                });
            });

            it('Then it should render edit icon', () => {
                expect(wrapper.find(keys.editColumn)).toHaveLength(1);
            });
        });
    });

    describe('Scenario Rendering a Blank Tile', () => {
        let wrapper;
        const props = {
            name: defaultProps.tileName,
            columns: [
                {
                    title: defaultProps.noAddressMessage,
                    addTitle: defaultProps.addTitle,
                    addIcon: defaultProps.icons.add
                }
            ],
            defaultValues: defaultProps.defaultValues,
            form: defaultProps.form,
            formMessage: defaultProps.formMessage,
            icon: defaultProps.icons.edit,
            isNoAddress: true
        };

        beforeAll(() => {
            wrapper = buildShallowWrapper(Tile, props);
        });

        describe('When isNoAddress is set to true', () => {
            it('Then it should render blank tile', () => {
                expect(wrapper.find(keys.emptyTileListTile)).toHaveLength(1);
            });
        });

        describe('When columns is provided', () => {
            it('Then it should display noAddressMessage as the title', () => {
                const blankTile = wrapper.find(keys.emptyTileListTile).first();
                const title = blankTile.find(keys.emptyTileListTileTitle);
                expect(title).toHaveLength(1);
                expect(title.first().text()).toEqual(
                    defaultProps.noAddressMessage
                );
            });

            it('Then it should display add tile', () => {
                const blankTile = wrapper.find(keys.emptyTileListTile).first();
                const addTile = blankTile.find(keys.emptyTileListTileAdd);
                expect(addTile).toHaveLength(1);
            });

            it('Then it should display add tile', () => {
                const blankTile = wrapper.find(keys.emptyTileListTile).first();
                const addTile = blankTile
                    .find(keys.emptyTileListTileAdd)
                    .first();
                const title = addTile.find(keys.emptyTileListTileAddTitle);
                expect(title).toHaveLength(1);
                expect(title.first().text()).toEqual(defaultProps.addTitle);
            });
        });
    });

    describe('Scenario Rendering Tile with Notification', () => {
        let wrapper;
        const props = {
            name: defaultProps.tileName,
            columns: defaultProps.columns,
            defaultValues: defaultProps.defaultValues,
            form: defaultProps.form,
            formMessage: defaultProps.formMessage,
            icon: defaultProps.icons.edit,
            notification: defaultProps.notification
        };

        beforeAll(() => {
            wrapper = buildShallowWrapper(Tile, props);
        });

        describe('When notification is provided', () => {
            it('Then it should render the notification wrapper', () => {
                expect(wrapper.find(keys.notification)).toHaveLength(1);
            });

            it('Then it should render the notification title', () => {
                const notification = wrapper.find(keys.notification);
                const title = notification.find(keys.notificationTitle);
                expect(title).toHaveLength(1);
                expect(title.first().text()).toEqual(props.notification.title);
            });

            it('Then it should render the notification description', () => {
                const notification = wrapper.find(keys.notification);
                const desc = notification.find(keys.notificationDesc);
                expect(desc).toHaveLength(1);
                expect(desc.first().text()).toEqual(
                    props.notification.description
                );
            });
        });
    });

    describe('Scenario Rendering the Form', () => {
        let wrapper;
        const props = {
            name: defaultProps.tileName,
            columns: defaultProps.columns,
            defaultValues: defaultProps.defaultValues,
            form: defaultProps.form,
            formMessage: defaultProps.formMessage,
            icon: defaultProps.icons.edit
        };

        beforeAll(() => {
            wrapper = buildShallowWrapper(Tile, props);
        });

        describe('When form is provided', () => {
            it('Then it should not render on the page by default', () => {
                expect(wrapper.find(keys.form)).toHaveLength(0);
            });

            it('Then it should be hidden by default', () => {
                expect(wrapper.find(keys.formShown)).toHaveLength(0);
                expect(wrapper.find(keys.formHidden)).toHaveLength(0);
            });

            it('Then it should become visible when user clicks edit', () => {
                const edit = wrapper.find(keys.editColumn).first();
                edit.simulate('click');

                expect(wrapper.exists(keys.formShown)).toEqual(true);
                expect(wrapper.exists(keys.formHidden)).toEqual(false);
            });

            it('Then it should render on the page after edit click', () => {
                expect(wrapper.find(keys.form)).toHaveLength(1);
            });
        });
    });

    describe('Scenario Render Tile and check snapshots', () => {
        let wrapper;
        let props = {
            name: defaultProps.tileName,
            columns: defaultProps.columns,
            defaultValues: defaultProps.defaultValues,
            form: defaultProps.form,
            formMessage: defaultProps.formMessage,
            icon: defaultProps.icons.edit
        };

        describe('When notification is not present', () => {
            it('Then the snapshot should match', () => {
                const json = renderer.create(<Tile {...props} />);
                expect(json).toMatchSnapshot();
            });
        });

        props.notification = defaultProps.notification;

        describe('When notification is present', () => {
            it('Then the snapshot should match', () => {
                const json = renderer.create(<Tile {...props} />);
                expect(json).toMatchSnapshot();
            });
        });

        props.isNoAddress = true;
        props.columns = [
            {
                title: defaultProps.noAddressMessage,
                addTitle: defaultProps.addTitle,
                addIcon: defaultProps.icons.add
            }
        ];

        describe('When tile is blank', () => {
            it('Then the snapshot should match', () => {
                const json = renderer.create(<Tile {...props} />);
                expect(json).toMatchSnapshot();
            });
        });
    });
});

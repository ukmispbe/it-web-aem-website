import React from 'react';
import generateTiles from '../generateTiles';
import {
    mockProfileData,
	defaultProps,
	personalTileJSON,
	shippingTileJSON,
    billingTileJSON,
    passwordTileJSON }
    from '../../__mocks__/en_US/index';
    import mockBodyHTML from '../../../__mocks__/en_US/html/mock-body-html';

describe('Scenario Generating Tile With Proper Information', () => {
    document.body.innerHTML = mockBodyHTML;

    // Personal Tile
    describe('When Type is Personal', () => {
        let expectedTiles = personalTileJSON;

        it('Then is should return one tile of user\'s details', () => {
            const tiles = generateTiles(mockProfileData, "personal", defaultProps.icon);
            console.log("mockgenerateTiles", tiles);
            expect(tiles).toHaveLength(expectedTiles.length);
            expect(tiles[0].columns).toHaveLength(expectedTiles[0].columns.length);

            tiles.forEach((tile, idx) => {
                expect(tile).toMatchObject(expectedTiles[idx]);
            });
        });
    });

    // Shipping Tile
    describe('When Type is shipToInfo', () => {
        let expectedTiles = shippingTileJSON;

        it('Then is should return multiple tiles of shipping address details', () => {
            const tiles = generateTiles(mockProfileData, "shipToInfo", defaultProps.icon);

            expect(tiles).toHaveLength(expectedTiles.length);

            tiles.forEach((tile, idx) => {
                expect(tile).toMatchObject(expectedTiles[idx]);
            });
        });
    });

    // Billing Tile
    describe('When Type is billToInfo', () => {
        const expectedTiles = billingTileJSON;

        it('Then is should return multiple tiles of billing address details', () => {
            const tiles = generateTiles(mockProfileData, "billToInfo", defaultProps.icon);

            expect(tiles).toHaveLength(expectedTiles.length);

            tiles.forEach((tile, idx) => {
                expect(tile).toMatchObject(expectedTiles[idx]);
            });
        });
    });

    // Password Tile
    describe('When Type is Password', () => {
        const expectedTiles = passwordTileJSON;

        it('Then is should return change password tile', () => {
            const tiles = generateTiles(mockProfileData, "password", defaultProps.icon);

            expect(tiles).toHaveLength(expectedTiles.length);

            tiles.forEach((tile, idx) => {
                expect(tile).toMatchObject(expectedTiles[idx]);
            });
        });
    });

});

// Invalid Tile
describe('Scenario Generating Tile With Improper Information', () => {
    describe('When Type is Invalid', () => {
        it('Then is should return an empty array', () => {
            const tiles = generateTiles(mockProfileData, "invalid", defaultProps.icon);

            expect(tiles).toHaveLength(0);
        });
    });

    describe('When Data is null', () => {
        it('Then is should return an empty array', () => {
            const tiles = generateTiles(null, "invalid", defaultProps.icon);

            expect(tiles).toHaveLength(0);
        });
    });
});
const partial = 'PARTIAL_ENABLED';
const full = 'FULL_ENABLED';
const disabled = 'DISABLED';

const currentState = jest.fn();

const isPartialState = jest.fn();

const isFullState = jest.fn();

const isDisabledState = jest.fn();

export default {
    currentState,
    partial,
    full,
    disabled,
    isPartialState,
    isFullState,
    isDisabledState
};

import React, { useContext } from 'react';

import FieldValidationDisplay from './components/field-validation-display';
import { useFieldApi } from '../form';

import Input from './input';
import CheckboxOrRadio from './checkboxOrRadio';
import Dropdown from './dropdown';
import Hr from './hr';
import Captcha from './captcha';
import Body from './body';
import Link from './link';

const formType = {
    text: Input,
    number: Input,
    password: Input,
    email: Input,
    radio: CheckboxOrRadio,
    checkbox: CheckboxOrRadio,
    dropdown: Dropdown,
    select: Dropdown,
    break: Hr,
    captcha: Captcha,
    body: Body,
    link: Link
};

const Field = ({}) => {
    const { type, name, hasMatch, field } = useContext(useFieldApi);

    const Component = formType[type];

    const getMatchName = () =>
        name
            ? 'confirm'.concat(name.charAt(0).toUpperCase() + name.slice(1))
            : '';

    return (
        Component && (
            <>
                <FieldValidationDisplay
                    name={name}
                    matchName={hasMatch ? getMatchName() : ''}
                >
                    <Component {...field} />
                </FieldValidationDisplay>
            </>
        )
    );
};

export default React.memo(Field);

import React, { useContext } from 'react';

import FieldValidationDisplay from './components/field-validation-display';
import { useFieldApi } from '../form';

import Input from './input';
import TextArea from './textarea';
import CheckboxOrRadio from './checkbox-radio';
import Dropdown from './dropdown';
import Hr from './hr';
import Captcha from './captcha';
import Body from './body';
import Link from './link';
import TextWithLinks from './text-with-links';
import Label from './label';
import File from './file';
import AddLineButton from './add-line-button';
import NavigateLink  from './navigate-link';
import FormNotification from './form-notification';
import DoubleLabel from './double-label';
import MultiLines from './multi-lines';

const formType = {
    text: Input,
    textarea: TextArea,
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
    link: Link,
    textwithlinks: TextWithLinks,
    label: Label,
    file: File,
    addLineButton: AddLineButton,
    navigateLink: NavigateLink,
    formNotification: FormNotification,
    doubleLabel: DoubleLabel,
    multiLines: MultiLines
};

const Field = ({}) => {
    const { type, name, hasMatch, field } = useContext(useFieldApi);

    const Component = formType[type];

    const getMatchName = () =>
        name
            ? 'confirm'.concat(name.charAt(0).toUpperCase() + name.slice(1))
            : '';

    return (
        Component && field.active!==false && (
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

import React from 'react';
import { shallow } from 'enzyme';
import ReactSVG from 'react-svg';

import Input from '../../../../../components/Input/Input';
import Notification from '../../../components/notification/Notification';
import Divider from '../../../components/divider/Divider';
import FileUpload from '../FileUpload';
import props from '../FileUpload.mock';

describe('<FileUpload />', () => {
    let enzymeWrapper;
    beforeAll(() => {
        enzymeWrapper = shallow(<FileUpload {...props} />);
    });
    it('should render without throwing an error', () => {
        expect(enzymeWrapper).toMatchSnapshot();
    });
    it('should display a link to upload a file', () => {
        expect(enzymeWrapper.find(Input)).toHaveLength(1);
        expect(enzymeWrapper.find(ReactSVG)).toHaveLength(1);
        expect(enzymeWrapper.find(ReactSVG).props().src).toBe(props.icons.upload);
        expect(enzymeWrapper.find('.file-upload-link')).toHaveLength(1);
        expect(enzymeWrapper.find(Input).dive().find('.file-input')).toHaveLength(1);
    });
    it('should display error to unselect file', () => {
        enzymeWrapper
            .find(Input)
            .props()
            .onChange([]);
        expect(enzymeWrapper.find(Notification)).toHaveLength(0);
        expect(enzymeWrapper.find(Divider)).toHaveLength(0);
    });
    it('should display error notification for choosing wrong file type', () => {
        enzymeWrapper
            .find(Input)
            .props()
            .onChange([{ name: 'test.jpeg' }]);
        expect(enzymeWrapper.find(Notification)).toHaveLength(1);
        expect(enzymeWrapper.find(Divider)).toHaveLength(1);
        expect(enzymeWrapper.find(Notification).props().type).toEqual('error');
        enzymeWrapper
            .find('.file-remove-link')
            .props()
            .onClick({ preventDefault: () => { } });
        enzymeWrapper.update();
    });
    it('should display success notification for choosing correct file type', () => {
        enzymeWrapper
            .find(Input)
            .props()
            .onChange([{ name: 'test.pdf' }]);
        expect(enzymeWrapper.find(Notification)).toHaveLength(1);
        expect(enzymeWrapper.find(Divider)).toHaveLength(1);
        expect(enzymeWrapper.find(Notification).props().type).toEqual('success');
    });
    it('should reset file container', () => {
        enzymeWrapper
            .find('.file-remove-link')
            .props()
            .onClick({ preventDefault: () => { } });
        expect(enzymeWrapper.find('.file-upload-link')).toHaveLength(1);
    });
    it('should display a link to file upload', () => {
        enzymeWrapper
            .find('.file-upload-link')
            .props()
            .onClick({ preventDefault: () => { } });
        expect(enzymeWrapper.find('.file-remove-link')).toHaveLength(0);
    });
});
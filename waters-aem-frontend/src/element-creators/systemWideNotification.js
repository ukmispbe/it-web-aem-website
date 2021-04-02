import DigitalData from "../scripts/DigitalData";
import GlobalTranslations from '../json-script-blocks/globalTranslations';
import { isEprocurementUser } from '../utils/userFunctions';

const SystemWideNotification = function(service, onDismiss) {
    let data;

    this.create = async (time) => {
        const siteContext = isEprocurementUser ? 'EPROC' : '';
        data = await service.getSystemWideNotification(DigitalData.language,siteContext);


        if (!data.enabled || !data.dateRange.isValid(time)) {
            return {
                visible: false
            };
        }

        return {
            visible: true,
            element: createFullWidthContainer()
        };
    }

    function createFullWidthContainer() {
        const element = document.createElement('div');
        element.classList.add('container-sitewide-notification');

        element.appendChild(createPageContainer());

        return element;
    }

    function createPageContainer() {
        const element = document.createElement('div');
        element.classList.add('container');

        element.appendChild(createWrapper());

        return element;
    }

    function createWrapper() {
        const element = document.createElement('div');
        element.classList.add('cmp-notification--sitewide');

        element.appendChild(createIcon());
        element.appendChild(createBody());

        return element;
    }

    function createIcon() {
        const element = document.createElement('div');
        element.classList.add('cmp-notification-icon');

        const icon = document.createElement('img');
        icon.src = '/content/dam/waters/en/brand-assets/icons/attention.svg';
        icon.classList.add('inline-svg');

        element.appendChild(icon);

        return element;
    }

    function createBody() {
        const element = document.createElement('div');
        element.classList.add('cmp-notification-body');

        element.appendChild(createTitle());
        element.appendChild(createMessage());
        element.appendChild(createDismiss());

        return element;
    }

    function createTitle() {
        const element = document.createElement('div');
        element.classList.add('cmp-notification-title');
        element.innerHTML = data.title;

        return element;
    }

    function createMessage() {
        const element = document.createElement('div');
        element.classList.add('cmp-notification-description');
        element.innerHTML = data.message;
        
        return element;
    }

    function createDismiss() {
        const element = document.createElement('div');
        element.classList.add('cmp-notification-dismiss');

        const anchor = document.createElement('a');
        anchor.href = 'javascript:void(0)';
        anchor.innerHTML = GlobalTranslations.dismissButton;
        anchor.onclick = onDismiss;
        element.appendChild(anchor);

        return element;
    }
}

export default SystemWideNotification;
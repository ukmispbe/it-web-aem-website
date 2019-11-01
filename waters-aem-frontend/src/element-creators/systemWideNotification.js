const SystemWideNotification = function(service) {
    this.create = async (time) => {
        const data = await service.getSystemWideNotification();

        if (!data.enabled || !data.dateRange.isValid(time)) {
            return {
                visible: false
            };
        }

        const wrapper = document.createElement('div');
        wrapper.classList.add('cmp-notification-wrapper');

        return {
            visible: true,
            element: wrapper
        };
    }
}

export default SystemWideNotification;
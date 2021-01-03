import { Notification } from 'src/api-v4/account';
import { pathOr } from 'ramda';
import { ResourcesState } from 'src/store';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: ResourcesState) => {
    const notifications = pathOr([], ['notifications', 'data'], state);
    return notifications.filter(
        (thisNotification: Notification) => thisNotification.type === 'ticket_abuse'
    );
};

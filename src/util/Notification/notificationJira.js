import { notification } from 'antd';
export const notifyFunction = (type, message, description) => {
    notification[type]({
        message,
        description
    });
};

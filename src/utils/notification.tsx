import toast from 'react-hot-toast';
import { FaInfo } from 'react-icons/fa';

const sentErrorNotification = (message: string) => toast(message, {
    duration: 4000,
    position: 'top-center',
    icon: <FaInfo color="#FFF" />,
    style: {
        background: '#E23F32',
        color: "#FFF"
    }
});

const sentSuccessNotification = (message: string) => toast(message, {
    duration: 4000,
    position: 'top-center',
    icon: <FaInfo color="#FFF" />,
    style: {
        background: '#93C00C',
        color: "#FFF"
    }
});


export {
    sentErrorNotification,
    sentSuccessNotification
};
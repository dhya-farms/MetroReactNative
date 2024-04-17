import Toast from 'react-native-toast-message';

export const showToast = ({ type = 'success', message }) => {
  Toast.show({
    type: type,  // 'success', 'info', 'error' etc.
    text1: message,
  });
};

export default Toast;
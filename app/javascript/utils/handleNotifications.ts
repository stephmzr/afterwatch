import { notification } from 'antd';

type FlashType = {
  type: 'open' | 'success' | 'warning' | 'error';
  description: string;
  message: string;
};

const showNotification = (flash: FlashType) => {
  notification[flash.type || 'open']({
    message: flash.message,
    description: null,
    placement: 'bottomRight',
    duration: 2,
  });
};

const handleNotifications = (response) => {
  const { data } = response;
  if (data) {
    const queryKeys = Object.keys(data);
    queryKeys.forEach((key) => {
      (data[key]?.flashMessages || []).forEach((flashMessage: any) => {
        showNotification(JSON.parse(flashMessage));
      });
    });
  }
  return response;
};

export default handleNotifications;

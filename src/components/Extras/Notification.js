import { notification } from "antd";

export const openNotificationWithIcon = (type, message, description) => {
  notification.config({ placement: "bottomRight" });
  notification[type]({
    message,
    description
  });
};

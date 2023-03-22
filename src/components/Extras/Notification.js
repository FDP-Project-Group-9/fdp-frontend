import { notification } from "antd";

export const openNotificationWithIcon = (type, message, description) => {
  notification.config({ placement: "topRight" });
  notification[type]({
    message,
    description
  });
};

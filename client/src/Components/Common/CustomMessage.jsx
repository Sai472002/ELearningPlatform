// MessageContext.js
import React, { createContext, useContext } from "react";
import { message } from "antd";

const MessageContext = createContext();

export const useCustomMessage = () => {
  return useContext(MessageContext);
};

export const MessageProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = (type, content, icon) => {
    messageApi.open({
      type: type,
      content: content,
      icon: icon,
    });
  };

  return (
    <MessageContext.Provider value={showMessage}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

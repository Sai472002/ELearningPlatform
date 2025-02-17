import {
  CheckOutlined,
  CloseOutlined,
  DeleteTwoTone,
  EditTwoTone,
} from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

const CustomButton = ({
  type = "default",
  color,
  variant = "solid",
  disabled,
  size = "default",
  icon,
  shape = "",
  title = "",
  onClick,
  className = "",
  loading,
  children,
}) => {
  return (
    <>
      {type === "edit" ||
      type === "delete" ||
      type === "approve" ||
      type === "reject" ? (
        <Button
          className={`uppercase w-fit ${className} ${
            type === "edit"
              ? "hover:bg-blue-100"
              : type === "approve"
              ? "hover:bg-green-100"
              : "hover:bg-red-100"
          }`}
          color={color}
          variant={type === "approve" || type === "reject" ? "link" : "default"}
          disabled={disabled}
          size={"small"}
          shape={"circle"}
          loading={loading}
          onClick={onClick}
        >
          {type === "edit" ? (
            <EditTwoTone shape="circle" className="absolute" />
          ) : type === "approve" ? (
            <CheckOutlined className="absolute p-1 text-green-600" />
          ) : type === "reject" ? (
            <CloseOutlined className="absolute p-1 text-red-600" />
          ) : (
            <DeleteTwoTone
              shape="circle"
              twoToneColor="#dc2626"
              className="absolute"
            />
          )}
          {title}
          {children}
        </Button>
      ) : (
        <Button
          className={`uppercase w-fit ${className}`}
          type={type}
          color={color}
          variant={variant}
          disabled={disabled}
          size={size}
          icon={icon}
          shape={shape}
          loading={loading}
          onClick={onClick}
        >
          {title}
          {children}
        </Button>
      )}
    </>
  );
};

export default CustomButton;

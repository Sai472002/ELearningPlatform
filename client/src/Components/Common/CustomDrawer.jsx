import { Drawer } from "antd";
import React from "react";
import CustomButton from "./CustomButton";

const CustomDrawer = ({
  title,
  onClose,
  open,
  children,
  onCancel,
  onSubmit,
  placement = "left",
  footer,
}) => {
  return (
    <Drawer
      title={
        <h1 className="capitalize text-xl text-PrimaryDark rounded-lg py-2">
          {title}
        </h1>
      }
      placement={placement}
      closable={false}
      width={"100%"}
      onClose={onClose}
      open={open}
      footer={
        footer
          ? footer
          : footer != false && (
              <div className="flex p-2 gap-4 justify-end">
                <CustomButton
                  title="cancel"
                  size="large"
                  variant="outlined"
                  onClick={onClose}
                />
                <CustomButton
                  title="submit"
                  size="large"
                  className="bg-Primary text-white"
                  variant="default"
                  onClick={onSubmit}
                />
              </div>
            )
      }
    >
      {children}
    </Drawer>
  );
};

export default CustomDrawer;

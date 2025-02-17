import { Modal } from "antd";
import React from "react";

const CustomModal = ({
  open,
  onClose,
  width,
  title,
  centered,
  classNames,
  showCloseButton = false,
  className,
  children,
  footer,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={width}
      centered={centered}
      className={classNames}
      footer={footer}
      closeIcon={showCloseButton} // Hide close icon
    >
      <>
        <p className="text-center font-bold sm:text-xl pb-4 border-b">
          {title}
        </p>
        <div className={`${className}`}>{children}</div>
      </>
    </Modal>
  );
};

export default CustomModal;

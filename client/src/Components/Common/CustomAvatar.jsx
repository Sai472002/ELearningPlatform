import {
  CameraFilled,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { POSTFILE } from "../ApiFunction/ApiFunction";
import { useCustomMessage } from "./CustomMessage";

const CustomAvatar = ({
  name,
  imagepath,
  refresh = () => {},
  editable = true,
  className,
}) => {
  const showMessage = useCustomMessage();
  const imageurl = `${imagepath}`;
  const [loading, setLoading] = useState(false);
  console.log(imageurl);

  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState(false);
  // Create a ref for the hidden file input
  const fileInputRef = useRef(null);

  // Trigger file input click
  const handleCameraClick = (e) => {
    // Prevent the avatar click event (if any) from toggling the preview
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file selection
  const handleFileChange = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profilepicture", file);

    if (file) {
      const response = await POSTFILE(
        `${process.env.REACT_APP_BACKEND_URL}/uploadimage`,
        formData
      );
      setLoading(false);
      showMessage("success", response.data.message);
      refresh();
      // Create a local URL of the selected file and update image state
    }
  };
  return (
    <div className="relative">
      <Avatar
        src={loading ? <LoadingOutlined /> : imageurl}
        className={`bg-Primary/20 text-Primary text-2xl size-16 border-4 border-white shadow-gray-400 shadow ${className} ${
          image.length > 0 && "cursor-pointer"
        }`}
        onClick={() => {
          if (image.length > 0) {
            setPreview(!preview);
          }
        }}
      >
        {name?.charAt(0).toUpperCase()}
      </Avatar>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {editable && (
        <CameraFilled
          onClick={handleCameraClick}
          className="text-Primary absolute bottom-0 right-0 scale-105 hover:text-indigo-700 cursor-pointer"
        />
      )}
      {preview && image && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setPreview(!preview)}
            key="box"
            className="h-screen w-screen fixed z-40 top-0 left-0 backdrop-blur-lg backdrop-brightness-75 flex items-center justify-center"
          >
            <img
              src={image}
              className="lg:h-4/5 lg:w-4/5 relative object-contain object-center"
            />
            <CloseOutlined
              className="p-2 text-white shadow-lg bg-slate-50/30 rounded-full z-[50px] absolute lg:top-10 lg:right-10 right-2 top-2"
              onClick={() => {
                setPreview(!preview);
              }}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default CustomAvatar;

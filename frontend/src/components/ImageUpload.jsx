import React from "react";
import { Upload, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const ImageUpload = ({ images, setImages }) => {
   const CLOUD_NAME = "dncx5gjr6";
  const UPLOAD_PRESET = "ecommerce_upload";
   const uploadProps = {
    name: "file",
    multiple: true,
    action: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    data: {
      upload_preset: UPLOAD_PRESET,
    },
    
    listType: "picture-card",
    showUploadList: false,
    onChange(info) {
      if (info.file.status === "done") {
        const url = info.file.response?.secure_url;
        if (url) {
          setImages(prev => [...prev, url]);
          message.success(`${info.file.name} başarıyla yüklendi`);
        }
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} yüklenemedi`);
      }
    },
  };

  const handleRemove = (urlToRemove) => {
    setImages(images.filter((url) => url !== urlToRemove));
  };

    return (
    <div className="flex flex-wrap gap-2">
      {images.map((url, index) => (
        <div
          key={index}
          className="relative w-[100px] h-[100px] rounded overflow-hidden shadow"
        >
          <img
            src={url}
            alt={`uploaded-${index}`}
            className="w-full h-full object-cover rounded"
          />
          <button
            onClick={() => handleRemove(url)}
            className="absolute top-0.5 right-0.5 bg-red text-red-600 rounded-full p-0.5 shadow hover:bg-red-100"
          >
            <DeleteOutlined style={{ fontSize: "12px" }} />
          </button>
        </div>
      ))}

      <Upload {...uploadProps}>
        <div className="w-[100px] h-[100px] border-2 border-dashed rounded flex flex-col items-center justify-center text-gray-500 hover:border-gray-400">
          <PlusOutlined style={{ fontSize: 16 }} />
        </div>
      </Upload>
    </div>
  );
};

export default ImageUpload;
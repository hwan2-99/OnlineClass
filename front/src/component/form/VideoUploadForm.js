import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const { Dragger } = Upload;
const draggerProps = {
  name: "file",
  multiple: true,
  action: "http://localhost:5000/prof/upload/video",

  onChange(info) {
    const { status } = info.file;
    console.log(info);

    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }

    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },

  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const VideoUpload = () => {
  return (
    <div>
      <h1>강의 업로드</h1>
      <hr />
      <p>업로드 시 필요한 데이터 정리하기</p>
      <Dragger {...draggerProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
    </div>
  );
};

export default VideoUpload;

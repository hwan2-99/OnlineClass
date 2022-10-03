import React from "react";
import { Form, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";

const onDrop = (e) => {
  console.log("Dropped files", e.dataTransfer.files);
};

const VideoUpload = () => {
  return (
    <div>
      <h1>강의 업로드</h1>
      <hr />
      <p>업로드 시 필요한 데이터 정리하기</p>
      <Form>
        <Dropzone
          onDrop={onDrop}
          multiple={false} //한번에 올리는 파일 갯수
          maxSize={100000000}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              style={{
                width: "300px",
                height: "240px",
                border: "1px solid lightray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              {...getRootProps()}
            >
              <Input {...getInputProps()} />
              <UploadOutlined type="plus" style={{ fontSize: "3rem" }} />
            </div>
          )}
        </Dropzone>
      </Form>
    </div>
  );
};

export default VideoUpload;

import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";
import profHandler from "../../lib/handler/profHandler";

const onDrop = (files) => {
  console.log("Dropped files", files);
  let formData = new FormData();
  formData.append("path", "class");
  formData.append("file", files[0]);
  console.log(formData);
  profHandler.postVideo(formData);
};

const VideoUpload = () => {
  const [form] = Form.useForm();

  const video_filename = Form.useWatch("video_filename", form);
  const video_title = Form.useWatch("video_title", form);
  const video_order = Form.useWatch("video_order", form);
  const video_length = Form.useWatch("video_length", form);

  const onSubmitHandler = (e) => {
    console.log(video_filename, video_title, video_order, video_length);
  };

  return (
    <div>
      <h1>강의 업로드</h1>
      <hr />
      <p>업로드 시 필요한 데이터 정리하기</p>
      <Form form={form} onFinish={onSubmitHandler}>
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
        <Form.Item name="video_filename" label="강의 파일명">
          <Input />
        </Form.Item>
        <Form.Item name="video_title" label="강의명">
          <Input />
        </Form.Item>
        <Form.Item name="video_order" label="강의 순서">
          <InputNumber />
        </Form.Item>
        <Form.Item name="video_length" label="강의길이">
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            제출
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VideoUpload;

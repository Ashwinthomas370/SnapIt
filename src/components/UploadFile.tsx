import { Card, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Dragger } = Upload;

interface UploadResponse {
  text: string;
}

async function uploadFileData(file: File): Promise<UploadResponse> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading file data:", error);
    message.error("Failed to upload file.");
    throw error;
  }
}

const UploadFile = () => {
  const [uploadedFile, setUploadedFile] = useState<UploadResponse | null>(null);

  const handleUpload = async (file, onSuccess, onError) => {
    try {
      const uploadedData = await uploadFileData(file as File);
      setUploadedFile(uploadedData);
      onSuccess("Ok");
      message.success("File uploaded successfully.");
    } catch (error) {
      onError(error);
      message.error("Failed to upload file.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Dragger
        accept=".jpg,.jpeg,.png,.gif,.bmp,.txt"
        multiple={false}
        customRequest={({ file, onSuccess, onError }) =>
          handleUpload(file, onSuccess, onError)
        }
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </Dragger>
      {uploadedFile && (
        <div>
          Uploaded File Data:
          <Card style={{ width: 300 }}>
            <span>{uploadedFile?.text}</span>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UploadFile;

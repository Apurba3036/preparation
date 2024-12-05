import axios from "axios";
import { useEffect, useState } from "react";

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analysisResult, setAnalysisResult] = useState("");
  const [files, setFiles] = useState([]);

  const [geminiData, setGeminiData] = useState();
  const [cloudImgUrl, setCloudImgUrl] = useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));

    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    uploadFile(event);

    const data = {
      name: selectedFile.name,
      type: selectedFile.type,
    };

    try {
      const response = await fetch("http://localhost:3000/Gemini/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
      setGeminiData(result?.analysis);

      if (response.ok) {
        setAnalysisResult(result.analysis); // Set the analysis result to state
      } else {
        console.error("Error:", result);
        alert("Image upload failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading the image.");
    }
  };

  const uploadFile = async (event) => {
    event.preventDefault();

    if (files.length === 0) {
      console.error("No files selected");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    console.log(files);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/files/upload", // Backend API endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Files Uploaded Successfully: ", response.data);
      // setFiles([]);
      if (response?.data?.message) {
        // setViewModalOpen(false);
        const imageLink = response?.data?.files[0]?.url;
        setCloudImgUrl(imageLink);
        // refetch();
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios Error:", err.message);
        if (err.response) {
          console.error("Response Status:", err.response.status);
          console.error("Response Data:", err.response.data);
        } else if (err.request) {
          console.error("Request Data:", err.request);
        } else {
          console.error("Error Details:", err);
        }
      } else {
        console.error("Non-Axios Error:", err);
      }
    }
  };

  const uploadImgSuggestions = async () => {
    if (cloudImgUrl && geminiData) {
      const suggestionData = { cloudImgUrl, geminiData };
      try {
        const response = await axios.post(
          "http://localhost:3000/api/room/upload-suggestion",
       
          suggestionData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response?.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    console.log(cloudImgUrl);

    uploadImgSuggestions();
  }, [cloudImgUrl, geminiData]);

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Upload an Image</h2>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="block w-full mb-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mb-4 rounded-lg shadow-md"
          />
        )}
        <button
          type="submit"
          onSubmit={() => handleSubmit()}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Upload
        </button>
      </div>

      {analysisResult && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Analysis Result:</h3>
          <p className="mt-2 text-gray-700">{analysisResult}</p>
        </div>
      )}
    </div>
  );
};

export default UploadImage;

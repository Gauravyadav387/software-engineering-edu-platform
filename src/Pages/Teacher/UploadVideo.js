import { useState } from "react";

const UploadVideo = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  // 📁 File Select + Convert to Base64
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFile(selectedFile);
        setPreview(reader.result); // base64
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  // 🚀 Upload Function
  const handleUpload = () => {
    if (!title || !subject || !file) {
      alert("All fields are required!");
      return;
    }

    const newVideo = {
      id: Date.now(),
      title,
      subject,
      views: 0,
      fileName: file.name,
      preview, // base64 video
    };

    const oldVideos = JSON.parse(localStorage.getItem("videos")) || [];
    localStorage.setItem("videos", JSON.stringify([...oldVideos, newVideo]));

    alert("Video Uploaded Successfully ✅");

    // reset
    setTitle("");
    setSubject("");
    setFile(null);
    setPreview("");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Upload Video
        </h2>

        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Video Title"
          className="border p-3 w-full mb-4 rounded"
        />

        {/* Subject */}
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter Subject"
          className="border p-3 w-full mb-4 rounded"
        />

        {/* File Upload */}
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="mb-4 w-full"
        />

        {/* Preview */}
        {preview && (
          <video
            src={preview}
            controls
            className="w-full mb-4 rounded"
          />
        )}

        {/* Button */}
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Upload Video
        </button>

      </div>
    </div>
  );
};

export default UploadVideo;
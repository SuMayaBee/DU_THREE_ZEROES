"use client";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import Input from "./UploadInput";
import { Gallery } from "react-grid-gallery";
const ImageUploaderWithGallery: React.FC = () => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>("");

  // Error and Loading States
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  // Handle image selection and preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewImages((prevImages) => [...prevImages, ...newImages]);
      setSelectedFiles(files);
    }
  };

  // Handle the actual image upload to the backend
  const handleUploadClick = async () => {
    if (!selectedFiles) {
      setMessage("No files selected for upload.");
      return;
    }

    setUploading(true);
    const formData = new FormData();

    Array.from(selectedFiles).forEach((file) => {
      formData.append("uploaded_file", file);
    });

    try {
      const response = await fetch("http://localhost:8000/upload-file/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Files uploaded successfully!");
        // Fetch images again to update the list, including newly uploaded
        await fetchImages();
      } else {
        setMessage("Failed to upload files.");
      }
    } catch (error) {
      setMessage("Error uploading files.");
    } finally {
      setUploading(false);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:8000/list-files/");
      if (!response.ok) {
        throw new Error("Failed to fetch image list");
      }

      const data = await response.json();
      if (data.files.length === 0) {
        setError("No files found.");
        setUploadedImages([]); // Reset the uploaded images if none are found
      } else {
        const fileUrls = data.files.map(
          (file: string) => `http://localhost:3000/uploads/${file}`
        );
        setUploadedImages(fileUrls); // Set the uploaded images state
        setError(null);
      }
    } catch (err) {
      setError("Error fetching image list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const openImageModal = (img: string) => {
    setCurrentImage(img);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
  };

  return (
    <div className="flex h-[90vh] bg-gray-100">
      {/* Left Side: Upload and Preview */}
      <div className="w-1/3 p-6 bg-white flex flex-col overflow-y-scroll h-full">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6 font-kanit">
          Image Uploader
        </h1>

        {/* Image Upload Input */}
        <div className="w-full bg-gray-50 p-4 rounded-lg shadow-lg mb-6">
          <Input handleImageUpload={handleImageUpload} />

          {/* Upload Button */}
          <button
            className="bg-[#5EC8E1] hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4 flex items-center justify-center shadow-lg transition duration-200 mt-4"
            onClick={handleUploadClick}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Images"}
          </button>
          {message && (
            <p className="mt-4 text-gray-600 text-center">{message}</p>
          )}
        </div>

        {/* Preview Section */}
        <div className="w-full bg-gray-50 p-4 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Previews</h2>
          <div className="grid grid-cols-2 gap-4">
            {previewImages.length > 0 ? (
              previewImages.map((img, index) => (
                <div
                  key={index}
                  className="relative w-full h-32 overflow-hidden rounded-lg border border-gray-300 shadow-md transition-transform transform hover:scale-105"
                >
                  <img
                    src={img}
                    alt={`Preview ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))
            ) : (
              <p className="col-span-2 text-gray-500 text-center">
                No images selected for upload
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right Side: Uploaded Images Gallery */}
      <div className="w-2/3 p-6 bg-white flex flex-col overflow-y-scroll h-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 font-kanit">
          Uploaded Images
        </h1>

        {loading && <p className="text-center">Loading images...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid grid-cols-3 gap-4">
          {uploadedImages.length > 0
            ? uploadedImages.map((img, index) => (
                <div
                  key={index}
                  className="relative w-full h-full overflow-hidden rounded-lg border border-gray-300 shadow-md transition-transform transform hover:scale-105 cursor-pointer"
                  onClick={() => openImageModal(img)}
                >
                  <img
                    src={img}
                    alt={`Uploaded ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))
            : !loading && (
                <p className="col-span-3 text-gray-500 text-center">
                  No images to display
                </p>
              )}
        </div>
      </div>

      {/* Modal for Image Slider */}
      <Modal isOpen={isModalOpen} onRequestClose={closeImageModal}>
        <div className="relative w-full h-full flex justify-center items-center">
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 bg-gray-200 rounded-full p-2"
          >
            Close
          </button>
          {currentImage && (
            <img
              src={currentImage}
              alt="Current"
              className="max-w-full max-h-full"
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ImageUploaderWithGallery;

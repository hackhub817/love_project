import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ProposeDay } from "./days/Propose";
import { HugDay } from "./days/Hug";
import { Kiss } from "./days/Kiss";
import { Valintine } from "./days/Valinetine";
import Promise from "./days/Promise";
import { Teddy } from "./days/Teddy";
import { ChocolateDay } from "./days/Chocolate";
import { uploadImages } from "../Pages/api/Api";

const ImageUploadForm = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [messages, setMessages] = useState({
    needToTellSomething: "",
    secretPromise: "",
    secretMessage: "",
    specialMessage: "",
  });

  // State for selected images for each day
  const [daySelections, setDaySelections] = useState({
    Rose: [],
    Propose: [],
    Chocolate: [],
    Teddy: [],
    Promise: [],
    Hug: [],
    Kiss: [],
    Valentine: [],
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length !== 12) {
      toast.error("Please select exactly 12 images");
      return;
    }
    setImages(files);

    // Create local URLs for preview
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(urls);
  };

  const handleMessageChange = (e) => {
    const { name, value } = e.target;
    setMessages((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePreview = () => {
    if (images.length !== 12) {
      toast.error("Please upload 12 images first");
      return;
    }
    setPreviewMode(true);
  };

  const handleDayImageSelection = (day, selectedImages) => {
    if (selectedImages.length > 5) {
      toast.error(`You can only select up to 5 images for ${day}`);
      return;
    }
    setDaySelections((prev) => ({
      ...prev,
      [day]: selectedImages,
    }));
  };

  const handleFinalSubmit = async () => {
    // Validate selections
    for (const day in daySelections) {
      if (daySelections[day].length === 0) {
        toast.error(`Please select images for ${day}`);
        return;
      }
    }

    try {
      // First upload all images to cloudinary
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });

      const uploadResponse = await uploadImages(formData);
      if (!uploadResponse.success) {
        throw new Error("Failed to upload images");
      }

      const imageUrls = uploadResponse.imageUrls;

      // Map local preview URLs to cloudinary URLs
      const urlMapping = {};
      previewImages.forEach((previewUrl, index) => {
        urlMapping[previewUrl] = imageUrls[index];
      });

      // Create day data for each day with cloudinary URLs
      for (const day in daySelections) {
        const cloudinaryUrls = daySelections[day].map(
          (previewUrl) => urlMapping[previewUrl]
        );

        const dayData = {
          day,
          images: cloudinaryUrls,
          messages: ["Default message"],
          ...messages,
        };

        const response = await fetch("/api/v1/daydata/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(dayData),
        });

        const data = await response.json();
        if (!data.success) {
          throw new Error(`Failed to create data for ${day}`);
        }
      }

      // Cleanup preview URLs
      previewImages.forEach(URL.revokeObjectURL);

      toast.success("Successfully created all day data!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Error creating day data");
      console.error(error);
    }
  };

  const renderDayPreview = () => {
    if (!selectedDay) return null;

    const previewProps = {
      isPreview: true,
      previewImages: daySelections[selectedDay],
    };

    switch (selectedDay) {
      case "Propose":
        return <ProposeDay {...previewProps} />;
      case "Hug":
        return <HugDay {...previewProps} />;
      case "Kiss":
        return <Kiss {...previewProps} />;
      case "Valentine":
        return <Valintine {...previewProps} />;
      case "Promise":
        return <Promise {...previewProps} />;
      case "Teddy":
        return <Teddy {...previewProps} />;
      case "Chocolate":
        return <ChocolateDay {...previewProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {!previewMode ? (
        // Upload Form
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload 12 Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full"
            />
          </div>

          {/* Message Fields */}
          {Object.keys(messages).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <textarea
                name={key}
                value={messages[key]}
                onChange={handleMessageChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                rows={3}
              />
            </div>
          ))}

          <button
            onClick={handlePreview}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Preview
          </button>
        </div>
      ) : (
        // Preview Mode
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-6">
              {Object.keys(daySelections).map((day) => (
                <div key={day} className="border p-4 rounded">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">{day}</h3>
                    <button
                      onClick={() => setSelectedDay(day)}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Preview Page
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {previewImages.map((url, idx) => (
                      <div
                        key={idx}
                        className={`cursor-pointer border-2 p-1 ${
                          daySelections[day].includes(url)
                            ? "border-blue-500"
                            : "border-gray-200"
                        }`}
                        onClick={() => {
                          const newSelection = daySelections[day].includes(url)
                            ? daySelections[day].filter((i) => i !== url)
                            : [...daySelections[day], url];
                          handleDayImageSelection(day, newSelection);
                        }}
                      >
                        <img
                          src={url}
                          alt=""
                          className="w-full h-16 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Selected: {daySelections[day].length}/5 images
                  </p>
                </div>
              ))}
            </div>

            <div className="border p-4 rounded">
              <h3 className="font-bold text-lg mb-4">Page Preview</h3>
              {renderDayPreview()}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                setPreviewMode(false);
                setSelectedDay(null);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              onClick={handleFinalSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Final Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;

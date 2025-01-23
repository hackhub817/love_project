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
import { uploadImages, createDayData } from "../Pages/api/Api";

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

  const [dayMessages, setDayMessages] = useState({
    Rose: [],
    Propose: [],
    Chocolate: [],
    Teddy: [],
    Promise: [],
    Hug: [],
    Kiss: [],
    Valentine: [],
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleDayMessageChange = (day, value) => {
    setDayMessages((prev) => ({
      ...prev,
      [day]: Array.isArray(value) ? value : [value],
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
    if (selectedImages.length > 6) {
      toast.error(`You can only select up to 6 images for ${day}`);
      return;
    }
    setDaySelections((prev) => ({
      ...prev,
      [day]: selectedImages,
    }));
  };

  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true);
      console.log("Starting submission process...");

      // Validation phase
      console.log("Starting validation...");
      for (const day in daySelections) {
        if (daySelections[day].length === 0) {
          toast.error(`Please select images for ${day}`);
          setIsSubmitting(false);
          return;
        }
        if (!dayMessages[day] || dayMessages[day].length === 0) {
          toast.error(`Please add at least one message for ${day}`);
          setIsSubmitting(false);
          return;
        }
      }
      console.log("Validation completed successfully");

      // Image upload phase
      console.log("Preparing to upload images...");
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });

      console.log("Uploading images to cloudinary...");
      const uploadResponse = await uploadImages(formData);
      if (!uploadResponse.success) {
        throw new Error("Failed to upload images");
      }
      console.log("Images uploaded successfully");

      const imageUrls = uploadResponse.imageUrls;

      // Create URL mapping
      console.log("Creating URL mapping...");
      const urlMapping = {};
      previewImages.forEach((previewUrl, index) => {
        urlMapping[previewUrl] = imageUrls[index];
      });

      // Create day data sequentially
      console.log("Starting day data creation...");
      const days = Object.keys(daySelections);

      // Using sequential async/await instead of Promise.all
      for (const day of days) {
        try {
          console.log(`Creating data for ${day}...`);
          const cloudinaryUrls = daySelections[day].map(
            (previewUrl) => urlMapping[previewUrl]
          );

          const dayData = {
            day,
            images: cloudinaryUrls,
            messages: dayMessages[day],
            ...messages,
          };

          // Use createDayData instead of submitTeddyDayData
          await createDayData(dayData);
          console.log(`Successfully created data for ${day}`);
        } catch (error) {
          console.error(`Error creating data for ${day}:`, error);
          throw new Error(`Failed to create data for ${day}: ${error.message}`);
        }
      }

      // Cleanup phase
      console.log("Starting cleanup...");
      previewImages.forEach(URL.revokeObjectURL);
      console.log("Cleanup completed");

      toast.success("Successfully created all day data!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error(error.message || "Error creating day data");
    } finally {
      console.log("Submission process completed");
      setIsSubmitting(false);
    }
  };

  const renderDayPreview = () => {
    if (!selectedDay) return null;

    const previewProps = {
      isPreview: true,
      previewImages: daySelections[selectedDay],
      messages: dayMessages[selectedDay],
      ...messages,
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
    <div className="max-w-7xl mx-auto p-6">
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

          {/* Global Message Fields */}
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
        // Preview Mode - Modified for better mobile experience
        <div className="space-y-6">
          {Object.keys(daySelections).map((day) => (
            <div key={day} className="space-y-4">
              {/* Day Selection Card */}
              <div className="border p-4 rounded">
                <h3 className="font-bold text-lg mb-4">{day}</h3>

                {/* Day-specific message input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Day Message
                  </label>
                  <textarea
                    value={dayMessages[day]?.[0] || ""}
                    onChange={(e) =>
                      handleDayMessageChange(day, e.target.value)
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm"
                    rows={2}
                  />
                </div>

                {/* Image Selection Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
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
                        // Automatically show preview on mobile after selection
                        if (window.innerWidth < 768) {
                          setSelectedDay(day);
                        }
                      }}
                    >
                      <img
                        src={url}
                        alt=""
                        className="w-full aspect-square object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Selected: {daySelections[day].length}/6 images
                </p>

                {/* Preview Button - Hidden on mobile */}
                <button
                  onClick={() => setSelectedDay(day)}
                  className="hidden sm:block bg-blue-500 text-white px-2 py-1 rounded text-sm mt-4"
                >
                  Preview Page
                </button>
              </div>

              {/* Preview Section - Shows immediately below on mobile */}
              {selectedDay === day && (
                <div className="border p-4 rounded">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Preview</h3>
                    <button
                      onClick={() => setSelectedDay(null)}
                      className="sm:hidden text-gray-500"
                    >
                      Close Preview
                    </button>
                  </div>
                  {renderDayPreview()}
                </div>
              )}
            </div>
          ))}

          {/* Submit Buttons */}
          <div className="flex gap-4 sticky bottom-0 bg-white p-4 border-t">
            <button
              onClick={() => {
                setPreviewMode(false);
                setSelectedDay(null);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded flex-1 sm:flex-none"
              disabled={isSubmitting}
            >
              Back
            </button>
            <button
              onClick={handleFinalSubmit}
              className={`bg-green-500 text-white px-4 py-2 rounded flex-1 sm:flex-none ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Final Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;

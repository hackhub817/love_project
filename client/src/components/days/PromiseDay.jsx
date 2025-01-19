import { useState } from "react";
import { toast } from "sonner";
import { submitTeddyDayData, uploadImages } from "../../Pages/api/Api";
import { motion } from "framer-motion";
import { ProposeDay } from "./Propose";

const PromiseDay = () => {
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    topImages: [], // For first 3 images
    bottomImages: [], // For next 4 images
    message: "",
  });

  // Store temporary image files before upload
  const [tempImages, setTempImages] = useState({
    topImages: [],
    bottomImages: [],
  });

  const handleImageChange = (e, type) => {
    const files = Array.from(e.target.files);
    const maxImages = type === "topImages" ? 3 : 4;

    if (files.length > maxImages) {
      toast.error(`You can only upload up to ${maxImages} images`);
      return;
    }

    // Create temporary URLs for preview
    const tempUrls = files.map((file) => URL.createObjectURL(file));
    setTempImages((prev) => ({
      ...prev,
      [type]: files,
    }));

    setFormData((prev) => ({
      ...prev,
      [type]: tempUrls,
    }));
  };

  const handlePreview = (e) => {
    e.preventDefault();
    if (formData.topImages.length !== 3 || formData.bottomImages.length !== 4) {
      toast.error("Please upload all required images");
      return;
    }
    if (!formData.message.trim()) {
      toast.error("Please enter a message");
      return;
    }
    setShowPreview(true);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Upload top images
      const topImagesFormData = new FormData();
      tempImages.topImages.forEach((file) => {
        topImagesFormData.append("images", file);
      });
      const topImagesResponse = await uploadImages(topImagesFormData);

      // Upload bottom images
      const bottomImagesFormData = new FormData();
      tempImages.bottomImages.forEach((file) => {
        bottomImagesFormData.append("images", file);
      });
      const bottomImagesResponse = await uploadImages(bottomImagesFormData);

      // Combine all image URLs
      const allImages = [
        ...topImagesResponse.imageUrls,
        ...bottomImagesResponse.imageUrls,
      ];

      // Submit the data
      await submitTeddyDayData({
        day: "Promise",
        messages: [formData.message],
        images: allImages,
      });

      toast.success("Promise day data saved successfully!");
      setShowPreview(false);
      // Reset form
      setFormData({
        topImages: [],
        bottomImages: [],
        message: "",
      });
    } catch (error) {
      toast.error(error.message || "Error saving data");
    } finally {
      setLoading(false);
    }
  };

  if (showPreview) {
    return (
      <div>
        <ProposeDay previewData={formData} />
        <div className="fixed bottom-5 right-5 space-x-4">
          <button
            onClick={() => setShowPreview(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          >
            Edit
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-400"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handlePreview} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Top Images (Exactly 3)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageChange(e, "topImages")}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
          <div className="flex gap-2 mt-2">
            {formData.topImages.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Top image ${idx + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Bottom Images (Exactly 4)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageChange(e, "bottomImages")}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
          <div className="flex gap-2 mt-2">
            {formData.bottomImages.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Bottom image ${idx + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Your Promise Message
          </label>
          <textarea
            value={formData.message}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, message: e.target.value }))
            }
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Write your promise message..."
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Preview
        </button>
      </form>
    </div>
  );
};

export default PromiseDay;

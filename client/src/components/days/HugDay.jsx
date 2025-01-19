import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { submitTeddyDayData, uploadImages } from "../../Pages/api/Api";

const HugDay = () => {
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    centerImage: null,
    surroundingImages: [],
    message: "",
  });

  // Store temporary image files
  const [tempImages, setTempImages] = useState({
    centerImage: null,
    surroundingImages: [],
  });

  const handleCenterImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTempImages((prev) => ({
        ...prev,
        centerImage: file,
      }));
      setFormData((prev) => ({
        ...prev,
        centerImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleSurroundingImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 6) {
      toast.error("You can only upload up to 6 surrounding images");
      return;
    }

    const tempUrls = files.map((file) => URL.createObjectURL(file));
    setTempImages((prev) => ({
      ...prev,
      surroundingImages: files,
    }));
    setFormData((prev) => ({
      ...prev,
      surroundingImages: tempUrls,
    }));
  };

  const handlePreview = (e) => {
    e.preventDefault();
    if (!formData.centerImage || formData.surroundingImages.length < 6) {
      toast.error("Please upload all required images");
      return;
    }
    setShowPreview(true);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Upload center image
      const centerImageFormData = new FormData();
      centerImageFormData.append("images", tempImages.centerImage);
      const centerImageResponse = await uploadImages(centerImageFormData);

      // Upload surrounding images
      const surroundingImagesFormData = new FormData();
      tempImages.surroundingImages.forEach((file) => {
        surroundingImagesFormData.append("images", file);
      });
      const surroundingImagesResponse = await uploadImages(
        surroundingImagesFormData
      );

      // Submit all data
      await submitTeddyDayData({
        day: "Hug",
        messages: [formData.message],
        images: [
          centerImageResponse.imageUrls[0],
          ...surroundingImagesResponse.imageUrls,
        ],
      });

      toast.success("Hug Day data submitted successfully!");
      setShowPreview(false);
      // Reset form
      setFormData({
        centerImage: null,
        surroundingImages: [],
        message: "",
      });
      setTempImages({
        centerImage: null,
        surroundingImages: [],
      });
    } catch (error) {
      toast.error("Failed to submit data");
    } finally {
      setLoading(false);
    }
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-indigo-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-indigo-900">
              Hug Day Preview
            </h1>
          </motion.div>

          <div className="relative w-full aspect-square max-w-2xl mx-auto">
            {/* Center Image */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 aspect-square rounded-full overflow-hidden z-10 border-4 border-white shadow-xl"
            >
              <img
                src={formData.centerImage}
                alt="Center"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Surrounding Images */}
            {formData.surroundingImages.map((url, index) => {
              const angle = index * 60 * (Math.PI / 180);
              const radius = 42; // Percentage of container width
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);

              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="absolute w-1/4 aspect-square rounded-full overflow-hidden border-4 border-white shadow-lg"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <img
                    src={url}
                    alt={`Surrounding ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setShowPreview(false)}
              className="px-6 py-2 bg-white text-indigo-600 rounded-full border-2 border-indigo-600 hover:bg-indigo-50"
            >
              Edit
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:bg-gray-400 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span>Submitting</span>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-indigo-900 mb-6">Hug Day</h1>

      <form onSubmit={handlePreview} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Center Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleCenterImageChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
          {formData.centerImage && (
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img
                src={formData.centerImage}
                alt="Center preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Surrounding Images (Exactly 6)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleSurroundingImagesChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
          <div className="flex flex-wrap gap-2">
            {formData.surroundingImages.map((url, idx) => (
              <div key={idx} className="w-20 h-20 rounded-full overflow-hidden">
                <img
                  src={url}
                  alt={`Surrounding ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Your Message
          </label>
          <textarea
            value={formData.message}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, message: e.target.value }))
            }
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Write your message..."
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

export default HugDay;

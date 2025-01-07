import { useState, useEffect } from "react";
import { toast } from "sonner";
import { submitTeddyDayData, uploadImages } from "../../Pages/api/Api";
import { motion } from "framer-motion";

const PreviewCard = ({ title, children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold text-indigo-900 mb-4">{title}</h2>
      {children}
    </motion.div>
  );
};

const TeddyDay = () => {
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    topImages: [],
    prettyMessage: "",
    meetingImages: [],
    needToSay: "",
  });

  // Store temporary image files before upload
  const [tempImages, setTempImages] = useState({
    topImages: [],
    meetingImages: [],
  });

  const handleImageChange = (e, type) => {
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      toast.error("You can only upload up to 3 images");
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

  const handlePreview = () => {
    if (
      formData.topImages.length === 0 ||
      formData.meetingImages.length === 0
    ) {
      toast.error("Please select all required images");
      return;
    }

    if (!formData.prettyMessage || !formData.needToSay) {
      toast.error("Please fill in all message fields");
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

      // Upload meeting images
      const meetingImagesFormData = new FormData();
      tempImages.meetingImages.forEach((file) => {
        meetingImagesFormData.append("images", file);
      });
      const meetingImagesResponse = await uploadImages(meetingImagesFormData);

      // Submit all data
      await submitTeddyDayData({
        day: "Teddy",
        messages: [formData.prettyMessage, formData.needToSay],
        images: [
          ...topImagesResponse.imageUrls,
          ...meetingImagesResponse.imageUrls,
        ],
      });

      toast.success("Teddy Day data submitted successfully!");

      // Reset form and preview
      setFormData({
        topImages: [],
        prettyMessage: "",
        meetingImages: [],
        needToSay: "",
      });
      setTempImages({
        topImages: [],
        meetingImages: [],
      });
      setShowPreview(false);
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Failed to submit data");
    } finally {
      setLoading(false);
    }
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header with Teddy Bear */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-32 h-32 mx-auto mb-4">
              <img
                src="/teddy-bear.png"
                alt="Teddy Bear"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold text-indigo-900 mb-2">
              You're my favorite teddy bear
            </h1>
            <p className="text-gray-600">Preview your special moments</p>
          </motion.div>

          {/* Top Images Section */}
          <PreviewCard title="Our Special Moments" delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formData.topImages.map((url, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="aspect-square rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src={url}
                    alt={`Special moment ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </PreviewCard>

          {/* Pretty Message Section */}
          <PreviewCard title="My Heart Says..." delay={0.4}>
            <div className="bg-pink-50 p-6 rounded-lg border-2 border-pink-200">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-800 whitespace-pre-wrap text-lg italic"
              >
                "{formData.prettyMessage}"
              </motion.p>
            </div>
          </PreviewCard>

          {/* First Meeting Section */}
          <PreviewCard title="When We First Met" delay={0.6}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formData.meetingImages.map((url, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="aspect-square rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src={url}
                    alt={`Meeting moment ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </PreviewCard>

          {/* Need to Say Section */}
          <PreviewCard title="Need to Tell You..." delay={0.8}>
            <div className="bg-indigo-50 p-6 rounded-lg border-2 border-indigo-200">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-800 whitespace-pre-wrap text-lg"
              >
                {formData.needToSay}
              </motion.p>
            </div>
          </PreviewCard>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex justify-end gap-4 mt-8"
          >
            <button
              onClick={() => setShowPreview(false)}
              className="px-6 py-3 text-indigo-600 border-2 border-indigo-600 rounded-full hover:bg-indigo-50 transition-colors duration-300"
            >
              Edit
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300 disabled:bg-gray-400 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span>Submitting</span>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </>
              ) : (
                "Submit"
              )}
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-indigo-900 mb-6">Teddy Day</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePreview();
        }}
        className="space-y-6"
      >
        {/* Form fields remain the same */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Upload Top Images (Max 3)
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
            Pretty Message
          </label>
          <textarea
            value={formData.prettyMessage}
            onChange={(e) => {
              if (e.target.value.length <= 300) {
                setFormData((prev) => ({
                  ...prev,
                  prettyMessage: e.target.value,
                }));
              }
            }}
            maxLength={300}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Write your message (max 300 characters)"
          />
          <p className="text-sm text-gray-500">
            {formData.prettyMessage.length}/300 characters
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Meeting for the First Time Images (Max 3)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageChange(e, "meetingImages")}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
          <div className="flex gap-2 mt-2">
            {formData.meetingImages.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Meeting image ${idx + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Need to Say
          </label>
          <textarea
            value={formData.needToSay}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                needToSay: e.target.value,
              }));
            }}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Write what you need to say..."
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

export default TeddyDay;

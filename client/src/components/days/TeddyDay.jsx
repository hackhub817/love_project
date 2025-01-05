import { useState } from "react";
import { toast } from "sonner";
import { submitTeddyDayData } from "../../Pages/api/Api";

const TeddyDay = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    topImages: [],
    prettyMessage: "",
    meetingImages: [],
    needToSay: "",
  });

  const handleImageChange = async (e, type) => {
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      toast.error("You can only upload up to 3 images");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      setLoading(true);
      // You'll need to implement this API endpoint
      const response = await uploadImages(formData);

      setFormData((prev) => ({
        ...prev,
        [type]: response.imageUrls,
      }));
      toast.success("Images uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload images");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.topImages.length === 0 ||
      formData.meetingImages.length === 0
    ) {
      toast.error("Please upload all required images");
      return;
    }

    if (!formData.prettyMessage || !formData.needToSay) {
      toast.error("Please fill in all message fields");
      return;
    }

    try {
      setLoading(true);
      await submitTeddyDayData({
        day: "Teddy",
        messages: [formData.prettyMessage, formData.needToSay],
        images: [...formData.topImages, ...formData.meetingImages],
      });

      toast.success("Teddy Day data submitted successfully!");
      // Reset form
      setFormData({
        topImages: [],
        prettyMessage: "",
        meetingImages: [],
        needToSay: "",
      });
    } catch (error) {
      toast.error("Failed to submit data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-indigo-900 mb-6">Teddy Day</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Top Images */}
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

        {/* Pretty Message */}
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

        {/* Meeting Images */}
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

        {/* Need to Say */}
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
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default TeddyDay;

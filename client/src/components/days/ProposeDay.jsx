import { useState } from "react";
import { toast } from "sonner";
import { submitTeddyDayData, uploadImages } from "../../Pages/api/Api";
import { motion } from "framer-motion";
import { ProposeDay } from "./Propose";
import kissBg from "../../assets/kisss/kissBg.png";
import frame from "../../assets/kisss/frame.png";
import kiss from "../../assets/kisss/kiss.png";
import butterfly from "../../assets/kisss/butterfly.png";
import couple from "../../assets/hug/couple1.jpg";
import couple2 from "../../assets/hug/couple2.jpg";
import ribbon from "../../assets/kisss/ribbon.png";

export const Propose = () => {
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
      // <div>
      //   <ProposeDay previewData={formData} />
      //   <div className="fixed bottom-5 right-5 space-x-4">
      //     <button
      //       onClick={() => setShowPreview(false)}
      //       className="px-4 py-2 bg-gray-500 text-white rounded-lg"
      //     >
      //       Edit
      //     </button>
      //     <button
      //       onClick={handleSubmit}
      //       disabled={loading}
      //       className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-400"
      //     >
      //       {loading ? "Saving..." : "Save"}
      //     </button>
      //   </div>
      // </div>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="w-full bg-cover"
            style={{ backgroundImage: `url(${kissBg})` }}
          >
            <div className="max-w-3xl mx-auto">
              <section>
                <div className="flex items-center justify-between">
                  <div>
                    <img src={butterfly} alt="" className="mb-24 h-[72px]" />
                  </div>
                  <div>
                    <img src={kiss} alt="" className="h-72" />
                  </div>
                  <div>
                    <img src={butterfly} alt="" className="" />
                  </div>
                </div>
              </section>
              <section className="mt-10">
                <div className="grid grid-cols-3 relative">
                  {formData?.topImages?.map((imageUrl, idx) => (
                    <div key={idx}>
                      <img
                        src={frame}
                        alt=""
                        className="lg:w-auto sm:w-auto w-32"
                      />
                      <img
                        src={imageUrl}
                        alt={`Image ${idx + 1}`}
                        className="absolute lg:left-[80px] sm:left-[80px] left-[40px] top-[1px] lg:h-[230px] lg:w-[174px] h-[110px] w-[90px] sm:h-[230px] sm:w-[174px]"
                        style={{ left: `${80 + idx * 257}px` }}
                      />
                    </div>
                  ))}
                </div>
              </section>
              <section className="mt-10 relative px-4">
                <div className="bg-[#CDBEE9] rounded-2xl lg:h-28 sm:h-28 h-20">
                  <div className="absolute -top-5 -left-4">
                    <img src={ribbon} alt="" />
                  </div>
                  <div className="p-4 text-center text-gray-800">
                    {formData?.message}
                  </div>
                </div>
              </section>
              <section className="mt-10">
                <div className="grid lg:grid-cols-2 sm:grid-cols-2 grid-cols-1 lg:px-0 sm:px-4 px-8">
                  {formData?.bottomImages?.map((imageUrl, idx) => (
                    <div key={idx} className="py-4">
                      <div className="relative">
                        <img
                          src={imageUrl}
                          alt={`Bottom image ${idx + 1}`}
                          className="border-[15px] h-80 w-80 rounded-2xl border-[#CDBEE9]"
                        />
                        <img
                          src={ribbon}
                          alt=""
                          className="absolute -top-5 -left-2"
                        />
                        <img
                          src={ribbon}
                          alt=""
                          className="absolute -top-5 left-[270px]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <div className="bg-[#CDBEE9] h-14 ">
              <div className=" flex max-w-xl mx-auto items-center justify-evenly py-2">
                <div>
                  <img src={butterfly} alt="" className="h-10 w-10" />
                </div>
                <div>
                  <img src={butterfly} alt="" className="h-10 w-10" />
                </div>
              </div>
            </div>
          </div>
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

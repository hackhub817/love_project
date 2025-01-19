import { useState } from "react";
import { toast } from "sonner";
import { submitTeddyDayData, uploadImages } from "../../Pages/api/Api";
import { motion } from "framer-motion";
import { Kiss } from "./Kiss";
import bg from "../../assets/kiss/bg.png";
import kiss from "../../assets/kiss/pandakiss.png";
import message from "../../assets/kiss/message.png";
import couple2 from "../../assets/hug/couple2.jpg";
import dil from "../../assets/kiss/dil.png";
import love from "../../assets/kiss/lovelove.png";

import img from "../../assets/kiss/img-2.png";
import kissfooter from "../../assets/kiss/kissfooter.png";

const KissDay = () => {
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    upperImage: [],
    middleImages: [],
    lowerImage: [],
    message: "",
  });

  const [tempImages, setTempImages] = useState({
    upperImage: [],
    middleImages: [],
    lowerImage: [],
  });

  const handleImageChange = (e, type) => {
    const files = Array.from(e.target.files);
    const maxImages = type === "middleImages" ? 3 : 1;

    if (files.length > maxImages) {
      toast.error(
        `You can only upload ${maxImages} image${maxImages > 1 ? "s" : ""}`
      );
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
    if (
      !formData.upperImage.length ||
      formData.middleImages.length !== 3 ||
      !formData.lowerImage.length
    ) {
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

      // Upload upper image
      const upperImageFormData = new FormData();
      tempImages.upperImage.forEach((file) => {
        upperImageFormData.append("images", file);
      });
      const upperImageResponse = await uploadImages(upperImageFormData);

      // Upload middle images
      const middleImagesFormData = new FormData();
      tempImages.middleImages.forEach((file) => {
        middleImagesFormData.append("images", file);
      });
      const middleImagesResponse = await uploadImages(middleImagesFormData);

      // Upload lower image
      const lowerImageFormData = new FormData();
      tempImages.lowerImage.forEach((file) => {
        lowerImageFormData.append("images", file);
      });
      const lowerImageResponse = await uploadImages(lowerImageFormData);

      // Combine all image URLs in the correct order
      const allImages = [
        ...upperImageResponse.imageUrls,
        ...middleImagesResponse.imageUrls,
        ...lowerImageResponse.imageUrls,
      ];

      // Submit the data
      await submitTeddyDayData({
        day: "Kiss",
        messages: [formData.message],
        images: allImages,
      });

      toast.success("Kiss day data saved successfully!");
      setShowPreview(false);
      // Reset form
      setFormData({
        upperImage: [],
        middleImages: [],
        lowerImage: [],
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
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-pink-200  relative">
            {/* Background Image with Opacity */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${bg})`,
              }}
            ></div>
            <div className="absolute inset-0 bg-white opacity-[.55]"></div>

            <section className="max-w-4xl mx-auto relative z-10">
              {" "}
              {/* Add z-10 to place above the overlay */}
              <div>
                <div className=" flex items-center justify-center">
                  <img src={kiss} alt="Panda Kiss" className="" />
                </div>
                <div className="relative flex items-center justify-center -mt-12 ">
                  <img src={message} alt="Panda Kiss" className="" />
                  <div className="lg:top-5 sm:top-5 top-2 lg:px-0 sm:px-0 px-4 absolute font-bold text-white lg:text-5xl sm:text-5xl text-2xl">
                    Happy Kiss day
                  </div>
                </div>
              </div>
              <div className="flex items-center lg:px-0 sm:px-0 px-4">
                <div className="bg-pink lg:p-8 sm:p-8 p-2 rounded-tl-xl lg:text-xl sm:text-xl text-sm rounded-bl-xl bg-pink-500 sm:h-[250px] lg:h-[250px] h-[180px]">
                  {" "}
                  Happy Hug Day, my love! ❤ I can ' t wait to feel your warm
                  embrace. 😘 You make me feel safe and loved. 🥰 Let's hug
                  tight and cherish this moment. 💕
                </div>
                <div className="relative my-10">
                  <img
                    src={formData.upperImage[0]}
                    alt=""
                    className="border-[10px] rounded-tr-xl rounded-br-xl border-pink-500 lg:w-[600px] sm:w-[600px] w-[1000px] sm:h-[250px] lg:h-[250px] h-[180px]"
                  />
                  <div className="flex items-center justify-center lg:block sm:block hidden">
                    <div className="absolute top-0 -mt-5 ">
                      <img src={dil} alt="" className="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-pink-500 ">
                <div className="flex items-center justify-end ">
                  <div>
                    <img
                      src={love}
                      alt=""
                      className="lg:h-20 lg:w-20 sm:h-20 sm:w-20 h-10 w-10  "
                    />
                    <img
                      src={img}
                      alt=""
                      className="lg:h-28 lg:w-28 sm:h-28 sm:w-28 h-8 w-8  "
                    />
                  </div>
                  {formData.middleImages.map((url, idx) => (
                    <img
                      src={url}
                      alt=""
                      className="lg:w-[250px] sm:w-[250px] sm:h-[280px]  lg:h-[280px] w-[135px] h-[120px] py-4 px-1"
                    />
                  ))}
                </div>
              </div>
              <div className="relative py-10">
                <img src={kissfooter} alt="" className="w-full" />
                <img
                  src={formData.lowerImage[0]}
                  alt=""
                  className="absolute lg:top-24 lg:left-[28px] lg:w-[276px] lg:h-[335px] sm:top-[85px] sm:left-[28px] sm:w-[236px] sm:h-[290px] top-14 left-[12px] w-[95px] h-[125px]"
                />
              </div>
            </section>
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
            Upper Image (1 image)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "upperImage")}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
          {formData.upperImage.length > 0 && (
            <img
              src={formData.upperImage[0]}
              alt="Upper preview"
              className="w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Middle Images (Exactly 3)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageChange(e, "middleImages")}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
          <div className="flex gap-2 mt-2">
            {formData.middleImages.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Middle image ${idx + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Lower Image (1 image)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "lowerImage")}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
          {formData.lowerImage.length > 0 && (
            <img
              src={formData.lowerImage[0]}
              alt="Lower preview"
              className="w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Your Kiss Day Message
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

export default KissDay;

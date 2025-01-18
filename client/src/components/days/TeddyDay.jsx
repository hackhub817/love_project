import { useState, useEffect } from "react";
import { toast } from "sonner";
import { submitTeddyDayData, uploadImages } from "../../Pages/api/Api";
import { motion } from "framer-motion";
import flower from "../../assets/teddy/flower.png";
import bg from "../../assets/teddy/bg.png";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import couple1 from "../../assets/hug/couple1.jpg";
import sit from "../../assets/teddy/sittingTeddy.png";
import love from "../../assets/teddy/love.png";
import loveteddy from "../../assets/teddy/loveteddy.png";
import loveteddy2 from "../../assets/teddy/teddylove2.png";
import ballon from "../../assets/teddy/ballon.png";
import wall from "../../assets/teddy/wall.png";
import hand from "../../assets/teddy/hand.png";
import bg2 from "../../assets/teddy/bg2.png";

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
  const words = [
    {
      text: "Happy",
    },
    {
      text: "Teddy",
    },
    {
      text: "Day",
    },
    {
      text: "My ",
    },
    {
      text: "Love.",
      className: "text-red-500 ",
    },
  ];
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
          <div className="bg-pink-200  relative">
            {/* Background Image with Opacity */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${bg})`,
              }}
            >
              <div className="absolute inset-0 bg-white opacity-[.75]"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <section className="max-w-4xl mx-auto p-4">
                <div className="flex items-center justify-between">
                  <img src={flower} alt="" className="h-80" />
                  <div>
                    <TypewriterEffectSmooth
                      className="text-4xl"
                      words={words}
                    />
                  </div>
                </div>
              </section>
              <section className="max-w-4xl mx-auto mt-5 sm:px-4">
                <div className="bg-[#483F2C] h-auto grid grid-cols-3 gap-10 ">
                  {formData.topImages.map((url, idx) => (
                    <img
                      src={url}
                      alt="Image 1"
                      className="w-full h-auto object-cover py-10"
                    />
                  ))}
                </div>
              </section>
              <section className="max-w-4xl mx-auto mt-5 relative sm:px-6">
                <div className="flex items-center">
                  {/* Background Box */}
                  <div className="bg-[#483F2C] lg:h-72 sm:h-64 h-52  rounded-[40px] relative z-10 lg:p-12 sm:p-12 p-6 pl-3 -mr-10">
                    <div className="text-2xl text-center text-white ">
                      Happy Teddy Day!
                    </div>
                    <div className="lg:text-lg sm:text-lg text-sm text-white">
                      You're my favorite teddy bear. You're not just my
                      boyfriend/girlfriend, you're my favorite cuddly buddy!
                      🐻❤️ Every moment with you feels like a warm hug. I love
                      you more than words can say! 🥰
                    </div>
                  </div>

                  {/* Image */}
                  <img
                    src={sit}
                    alt="Image 1"
                    className="lg:w-full lg:h-auto sm:h-64 h-52 object-cover relative z-20 -ml-24"
                  />
                </div>
              </section>
              <section className="max-w-4xl mx-auto mt-5 sm:px-5  ">
                <div className="flex items-center">
                  <img
                    src={loveteddy}
                    alt="Image 1"
                    className="lg:h-52 sm:h-44 h-24 object-cover relative z-20 lg:-ml-10 sm:-ml-10"
                  />
                  <img
                    src={love}
                    alt="Image 1"
                    className="lg:w-44 lg:h-44 sm:w-32 sm:h-32 h-20   object-cover relative z-20 lg:-ml-10 sm:-ml-10 -ml-2"
                  />
                  <img
                    src={love}
                    alt="Image 1"
                    className="lg:w-44 lg:h-44 sm:w-32 sm:h-32 h-20   object-cover relative z-20 lg:-ml-10 sm:-ml-10 -ml-2"
                  />
                  <img
                    src={love}
                    alt="Image 1"
                    className="lg:w-44 lg:h-44 sm:w-32 sm:h-32 h-20   object-cover relative z-20 lg:-ml-10 sm:-ml-10 -ml-2"
                  />
                  <img
                    src={loveteddy2}
                    alt="Image 1"
                    className="lg:h-52 sm:h-44 h-24 object-cover relative z-20 lg:-ml-10 sm:-ml-10 -ml-2"
                  />
                </div>
              </section>
              <section className="max-w-4xl mx-auto mt-5 px-2 relative">
                <div className="flex items-center relative">
                  {/* Ballon Image */}
                  <img
                    src={ballon}
                    alt="Image 1"
                    className="lg:h-96 sm:h-72 h-44 lg:mb-10 sm:mb-10 mb-28 object-cover relative z-10 lg:-mr-40 sm:-mr-40 -mr-10"
                  />

                  {/* Wall Image */}
                  <div className="relative h-64 ">
                    <img
                      src={wall}
                      alt="Wall Image"
                      className="lg:h-full sm:h-56 h-32 lg:w-[850px] sm:w-[550px] w-[300px] object-cover relative  "
                    />

                    {/* Three Smaller Images */}

                    <div className="absolute top-10 lg:left-32 sm:left-32 left-8 w-full flex lg:gap-10 sm:gap-10 gap-2 -mt-5 z-20">
                      {formData.meetingImages.map((url, idx) => (
                        <img
                          src={url}
                          alt="Small Image 1"
                          className="lg:h-24 lg:w-24 sm:h-24 sm:w-24 h-14 w-14   border-4 border-white border-b-[14px] shadow-md"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <section className="max-w-4xl mx-auto  px-2 relative">
                <div className="flex items-center relative">
                  {/* Hand Image */}
                  <img
                    src={hand}
                    alt="Image 1"
                    className="lg:h-64 sm:h-48 h-32 object-cover relative z-20 lg:ml-20 sm:ml-32"
                  />

                  {/* BG2 Image */}
                  <div className="relative lg:w-[550px] sm:w-[450px] w-[300px] px-2 lg:h-60 sm:h-60 h-48 ">
                    <img
                      src={bg2}
                      alt="Background Image"
                      className="w-full h-full object-cover"
                    />

                    {/* Text Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center text-center text-white p-4">
                      <div>
                        <p className="lg:text-lg sm:text-base text-xs font-semibold mt-2">
                          All our adventures together, from silly movie nights
                          to exploring new places, feel like the best cuddles
                          with my favorite teddy bear. 🐻❤️ You know, I feel
                          like I've found my forever cuddle buddy in you. 🐻 ❤️
                          You're always there for me, a constant source of
                          comfort and joy. Happy Teddy Day, my love.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

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
